import { Route } from 'ash-core'
import fs from 'fs'
import path from 'path'

export default class WelcomeRoute extends Route {
  model () {
    this.response.setHeader('content-type', 'text/html')
    return fs.createReadStream(path.join(__dirname, '..', 'assets', 'welcome') + '.html')
  }
}
