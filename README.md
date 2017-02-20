<!-- TITLE/ -->

<h1>@ash-framework/cli</h1>

<!-- /TITLE -->


<!-- BADGES/ -->

<span class="badge-badge"><a href="https://mediasuite.co.nz" title="The Media Suite"><img src="https://mediasuite.co.nz/ms-badge.png" alt="The Media Suite" /></a></span>
<br class="badge-separator" />
<span class="badge-badge"><a href="https://nodei.co/npm/cli"><img src="https://nodei.co/npm/cli.png?downloads=true&stars=true" /></a></span>
<br class="badge-separator" />
<span class="badge-travisci"><a href="http://travis-ci.org/ash-framework/cli" title="Check this project's build status on TravisCI"><img src="https://img.shields.io/travis/ash-framework/cli/master.svg" alt="Travis CI Build Status" /></a></span>
<span class="badge-npmversion"><a href="https://npmjs.org/package/@ash-framework/cli" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@ash-framework/cli.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/@ash-framework/cli" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/@ash-framework/cli.svg" alt="NPM downloads" /></a></span>
<span class="badge-daviddm"><a href="https://david-dm.org/ash-framework/cli" title="View the status of this project's dependencies on DavidDM"><img src="https://img.shields.io/david/ash-framework/cli.svg" alt="Dependency Status" /></a></span>
<span class="badge-daviddmdev"><a href="https://david-dm.org/ash-framework/cli#info=devDependencies" title="View the status of this project's development dependencies on DavidDM"><img src="https://img.shields.io/david/dev/ash-framework/cli.svg" alt="Dev Dependency Status" /></a></span>

<!-- /BADGES -->


<!-- DESCRIPTION/ -->

Cli for Ash framework

<!-- /DESCRIPTION -->


<!-- INSTALL/ -->

<h2>Install</h2>

<a href="https://npmjs.com" title="npm is a package manager for javascript"><h3>NPM</h3></a><ul>
<li>Install: <code>npm install --global @ash-framework/cli</code></li>
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
import Ash from '@ash-framework/ash'

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
