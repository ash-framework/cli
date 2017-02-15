#!/usr/bin/env node

const program = require('commander')
const ora = require('ora')
const path = require('path')
const spawn = require('cross-spawn')
const ENV = require(path.join(process.cwd(), 'config', 'environment.js'))(process.env.NODE_ENV)
const nodemon = require('nodemon')

function run (appPath) {
  let spinner = ora('Starting Ash server').start()
  nodemon({
    script: appPath,
    exec: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'babel-node'),
    ext: 'js',
    stdout: false
  })

  nodemon.on('start', function () {
    spinner.text = `Ash server listening on port ${ENV.port}`
    spinner.stopAndPersist('🦄 ')
  })
  .on('quit', function () {
    spinner.text = 'Ash app exited cleanly'
    spinner.succeed()
  })
  .on('restart', function (files) {
    spinner.text = `Ash server restarted due to file changes`
    spinner.succeed()
  })
  .on('crash', function () {
    spinner.text = 'App has crashed, waiting for file changes'
    spinner.stopAndPersist('✖')
  })
  .on('readable', function () {
    const pino = spawn(path.join(__dirname, '..', '..', 'node_modules', '.bin', 'pino'), {
      stdio: ['pipe', process.stdout, process.stderr]
    }).stdin

    this.stdout.pipe(pino)
    this.stderr.pipe(pino)
  })
}

program.parse(process.argv)

run(path.join(process.cwd(), 'app', 'application.js'))
