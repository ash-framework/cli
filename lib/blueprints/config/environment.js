module.exports = function (environment) {
  const ENV = {
    host: 'http://localhost',
    port: 3010
  }

  ENV.cors = {
    origin: ENV.host,
    preFlight: true
  }

  ENV.bodyParser = {
    json: {
      type: 'application/json',
      extended: false
    }
  }

  ENV.database = {
    connection: ''
  }

  ENV.helmet = true

  return ENV
}
