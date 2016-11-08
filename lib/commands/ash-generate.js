#!/usr/bin/env node

const program = require('commander')
const ora = require('ora')
const path = require('path')
const ncp = require('ncp').ncp
const blueprintsDir = path.join(__dirname, '..', 'blueprints')
const mkdirp = require('mkdirp')
const EmberRouterGenerator = require('ember-router-generator')
const fs = require('fs')

program.parse(process.argv)

const directoriesByType = Object.freeze({
  route: path.join('app', 'routes'),
  middleware: path.join('app', 'middleware'),
  mixin: path.join('app', 'mixins')
})

function copy (src, dest) {
  if (dest.indexOf('/')) {
    const dirArr = dest.split('/')
    const dir = dirArr.slice(0, dirArr.length - 1)
    mkdirp.sync(dir.join('/'))
  }
  return new Promise((resolve, reject) => {
    ncp(src, dest, function (err) {
      if (err) return reject(err)
      resolve()
    })
  })
}

function validateType (type) {
  if (['route', 'middleware', 'mixin'].indexOf(type) < 0) {
    return Promise.reject(new Error('Expected `type` to be one of `route`, `middleware`, `mixin`'))
  }
  return type
}

function validateName (name) {
  if (!/^[a-z-\/]*$/.test(name)) {
    return Promise.reject(new Error('Expected `name` to be a dasherized lower case string'))
  }
  return name
}

function format (codeString) {
  return codeString
    .replace(/;/g, '')
    .replace(/function\(/g, 'function (')
}

let spinner, type, name

Promise.resolve()
  .then(() => {
    spinner = ora(`Checking parameters`).start()
    return Promise.all([
      validateType(program.args[0]),
      validateName(program.args[1])
    ])
  })
  .then(result => {
    [type, name] = result
    spinner.text = `Generating ${type} ${directoriesByType[type]}/${name}`
  })
  .then(() => {
    let file
    if (type === 'route') {
      file = path.join(blueprintsDir, 'route', 'route.js')
    } else if (type === 'mixin') {
      file = path.join(blueprintsDir, 'mixin', 'mixin.js')
    } else if (type === 'middleware') {
      file = path.join(blueprintsDir, 'middleware', 'middleware.js')
    }
    const dest = path.join(directoriesByType[type], `${name}.js`)
    return copy(file, dest)
  })
  .then(() => {
    spinner.text = `Generated ${directoriesByType[type]}/${name}.js`
    spinner.succeed()
  })
  .then(() => {
    if (type === 'route') {
      const routerFileLocation = path.join(process.cwd(), 'app', 'router.js')
      const router = fs.readFileSync(routerFileLocation)
      const routes = new EmberRouterGenerator(router)
      const newRoutes = routes.add(name)
      fs.writeFileSync(routerFileLocation, format(newRoutes.code()))
      spinner.text = `Updated router`
    } else if (type === 'middleware') {
      const mwRouterFileLocation = path.join(process.cwd(), 'app', 'middleware.js')
      const middlewareFunction = fs.readFileSync(mwRouterFileLocation, 'utf8')
      const routerFunction = middlewareFunction.replace(/middleware/g, 'route')
      const routes = new EmberRouterGenerator(routerFunction)
      const newRoutes = routes.add(name)
      const newMiddlewareFunction = format(newRoutes.code().replace(/route/g, 'middleware'))
      fs.writeFileSync(mwRouterFileLocation, newMiddlewareFunction)
      spinner.text = `Updated middleware router`
    }
  })
  .then(() => {
    spinner.succeed()
  })
  .then(() => {
    spinner.text = `Done!`
    spinner.stopAndPersist('🦄 ')
  })
  .catch(err => {
    spinner.text = err.message
    spinner.stopAndPersist('✖')
  })
