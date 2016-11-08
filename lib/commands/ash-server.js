#!/usr/bin/env node

const program = require('commander')
const ora = require('ora')
const path = require('path')
const spawn = require('cross-spawn')
const ENV = require(path.join(process.cwd(), 'config', 'environment.js'))(process.env.NODE_ENV)

function run (appPath) {
  const app = spawn('node', [appPath]).stdout
  const pino = spawn(path.join(__dirname, '..', '..', 'node_modules', '.bin', 'pino'), {
    stdio: ['pipe', process.stdout, process.stderr]
  }).stdin
  app.pipe(pino)
}

program.parse(process.argv)

let spinner

Promise.resolve()
  .then(() => {
    spinner = ora('Start Ash server').start()
    run(path.join(process.cwd(), 'app', 'application.js'))
  })
  .then(() => {
    spinner.text = `Ash server listening on port ${ENV.port}`
    spinner.start()
    spinner.stopAndPersist('🦄 ')
  })
  .catch(err => {
    spinner.text = err.message
    spinner.stopAndPersist('✖')
  })
