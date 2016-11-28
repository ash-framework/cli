module.exports = function (environment) {
  const ENV = {
    host: 'http://localhost',
    port: 3010
  }

  ENV.cors = {
    origin: ENV.host,
    preFlight: true
  }

  ENV.bodyparser = {
    json: {
      type: 'application/json', extended: false
    }
  }

  return ENV
}
