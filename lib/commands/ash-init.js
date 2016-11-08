#!/usr/bin/env node

const program = require('commander')
const path = require('path')
const Promise = require('bluebird')
const ncp = Promise.promisify(require('ncp').ncp)
const ora = require('ora')
const spawn = require('cross-spawn')

program.parse(process.argv)

let cl
let spinner

function install (modules = []) {
  return spawn.sync('npm', ['install', '-S', ...modules], { stdio: 'inherit' })
}

Promise.resolve()
  .then(() => {
    spinner = ora('Initializing project').start()
    const source = path.join(__dirname, '..', 'blueprints', 'package.json')
    const destination = process.cwd()
    return ncp(source, destination)
  })
  .then(() => {
    spinner.text = 'Initialize project'
    spinner.succeed()
  })
  .then(() => {
    spinner.text = 'Scaffolding files'
    spinner.start()
    const source = path.join(__dirname, '..', 'blueprints')
    const destination = process.cwd()
    return ncp(source, destination)
  })
  .then(() => {
    spinner.text = 'Scaffold files'
    spinner.succeed()
  })
  .then(() => {
    spinner.text = 'Installing dependencies'
    spinner.start()
    cl = console.log
    console.log = function () {}
    install([
      '@ash-framework/ash',
      'standard'
    ])
  })
  .then(() => {
    spinner.text = 'Install dependencies'
    spinner.succeed()
    console.log = cl
  })
  .then(() => {
    spinner.text = 'All done!'
    spinner.start()
    spinner.stopAndPersist('🦄 ')
  })
  .catch(err => {
    spinner.text = err.message
    spinner.stopAndPersist('✖')
  })
