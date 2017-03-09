import { Router } from 'ash-core'

class AppRouter extends Router {
}

AppRouter.map(function () {
  this.route('welcome', { path: '/' })
})

export default AppRouter
