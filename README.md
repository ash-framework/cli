![Ash Api Framework](/logo_vertical.jpg?raw=true "Ash Api Framework")

<!-- TITLE/ -->

<h1>ash-cli</h1>

<!-- /TITLE -->


<!-- DESCRIPTION/ -->

Cli for the Ash API framework

<!-- /DESCRIPTION -->


<!-- BADGES/ -->

<span class="badge-badge"><a href="https://mediasuite.co.nz" title="The Media Suite"><img src="https://mediasuite.co.nz/ms-badge.png" alt="The Media Suite" /></a></span>
<br class="badge-separator" />
<span class="badge-travisci"><a href="http://travis-ci.org/ash-framework/cli" title="Check this project's build status on TravisCI"><img src="https://img.shields.io/travis/ash-framework/cli/master.svg" alt="Travis CI Build Status" /></a></span>
<span class="badge-npmversion"><a href="https://npmjs.org/package/ash-cli" title="View this project on NPM"><img src="https://img.shields.io/npm/v/ash-cli.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/ash-cli" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/ash-cli.svg" alt="NPM downloads" /></a></span>
<span class="badge-daviddm"><a href="https://david-dm.org/ash-framework/cli" title="View the status of this project's dependencies on DavidDM"><img src="https://img.shields.io/david/ash-framework/cli.svg" alt="Dependency Status" /></a></span>
<span class="badge-daviddmdev"><a href="https://david-dm.org/ash-framework/cli#info=devDependencies" title="View the status of this project's development dependencies on DavidDM"><img src="https://img.shields.io/david/dev/ash-framework/cli.svg" alt="Dev Dependency Status" /></a></span>

<!-- /BADGES -->


<!-- INSTALL/ -->

<h2>Install</h2>

<a href="https://npmjs.com" title="npm is a package manager for javascript"><h3>NPM</h3></a><ul>
<li>Install: <code>npm install --global ash-cli</code></li>
<li>Executable: <code>ash</code></li></ul>

<!-- /INSTALL -->


## Usage

### Getting started

#### Before you begin

1. Make sure you are running the latest version of node js (At least version 7)

2. Install `yarn`
```
npm install --global yarn
```

3. (optional) to use models and the data layer, postgres must be installed

#### Install cli

You can install the Ash cli either via `yarn` or `npm`

```
// option 1. via yarn
yarn global add @ash-framework/cli
```

```
// option 2. via npm
npm install --global @ash-framework/cli
```

#### Scaffold up a new project
```
mkdir my-awesome-project
cd my-awesome-project
ash init
```

#### Create your first route
```
ash generate route posts
```

Edit your app/routes/posts.js route file to return something from the provided model
hook

```js
// app/routes/posts.js
import Ash from 'ash-core'

export default class PostsRoute extends Ash.Route {
  model () {
    return [
      {id: 1, title: 'My post 1', description: 'WoW'},
      {id: 2, title: 'My post 2', description: 'WoWsErS'}
    ]
  }
}
```

#### Run the server

```
ash server
```
and visit the url: `http://location:3010/posts`

### Models

#### Prepare your database

Create a new postgres database with a table named `posts`.
Add 2 text fields `title` and `description` as well as a sequence `id`

Edit your apps database configuration in the environment config file

#### Add connection details to `config/environment.js`

```js
module.exports = function (environment) {
  const ENV = {
    host: 'http://localhost',
    port: 3010
  }

  ENV.database = {
    connection: {
      user: '<username>',
      pass: '<password>',
      database: '<database to use>'
    }
  }

  return ENV
}
```

#### Create a Post Model

```
ash generate model post
```

Edit your `app/models/post.js` file to define a models attributes

```js
// app/models/post.js
import Ash from 'ash-core'

export default class PostsRoute extends Ash.Route {
  static attributes (attr) {
    attr('title', 'string')
    attr('description', 'string')
  }
}
```

#### Update your route

Edit your `app/routes/posts.js` model hook, change it to return post model data

```js
// app/routes/posts.js
import Ash from 'ash-core'

export default class PostsRoute extends Ash.Route {
  model () {
    return this.store.findAll('post')
  }
}
```

**Note:** You can also omit the model hook entirely in this case due to naming conventions.
A `posts` route will try to load all `post` models if no model hook is present.

#### JSON Api

Refresh: `http://location:3010/posts` and you should see your posts models serialized in [JSON API format](http://jsonapi.org/).

<!-- HISTORY/ -->

<h2>History</h2>

<a href="https://github.com/ash-framework/cli/releases">Discover the release history by heading on over to the releases page.</a>

<!-- /HISTORY -->


<!-- BACKERS/ -->

<h2>Backers</h2>

<h3>Maintainers</h3>

These amazing people are maintaining this project:

<ul><li>Richard Walker digitalsadhu@gmail.com</li></ul>

<h3>Sponsors</h3>

These amazing people have contributed finances to this project:

<ul><li><a href="http://mediasuite.co.nz">The Media Suite</a></li></ul>

Become a sponsor!



<h3>Contributors</h3>

These amazing people have contributed code to this project:

<ul><li><a href="http://lovebeer.nz/">Richard Walker</a> — <a href="https://github.com/ash-framework/cli/commits?author=digitalsadhu" title="View the GitHub contributions of Richard Walker on repository ash-framework/cli">view contributions</a></li></ul>



<!-- /BACKERS -->


<!-- LICENSE/ -->

<h2>License</h2>

Unless stated otherwise all works are:

<ul><li>Copyright &copy; <a href="http://lovebeer.nz/">Richard Walker</a></li></ul>

and licensed under:

<ul><li><a href="http://spdx.org/licenses/MIT.html">MIT License</a></li></ul>

<!-- /LICENSE -->
