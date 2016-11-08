#!/usr/bin/env node

process.title = 'ash-cli'

const program = require('commander')

program
  .version(require('../../package.json').version)
  .command('init', 'initialize a new Ash project')
  .command('server', 'serve up an Ash project').alias('s')
  .command('generate [type] [name]', 'generate resource of [type] with given [name] for an Ash project').alias('g')
  .parse(process.argv)
