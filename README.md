# Express React Boilerplate

Boilerplate for combining Express server-side rendering and React using a component based structure.

This boilerplate will allow you to a deliver server-side rendered while inserting a React component into that page.

E.g. you will be able to build and inject React widgets where appropriate.

## Dependencies
Express dependencies for server side rendering (basic express app using .hbs for template engine and bodyParser to handle POST requests)
```
npm i --save express express-handlebars body-parser 
```
Webpack and babel dependencies for bundling ES6 imports (allow us to use component based architecture and import/ reuse code)
```
npm i --save-dev webpack webpack-cli @babel/core @babel/preset-env babel-loader
```

React specific babel and react dependencies (use react in our components)
```
npm i --save react react-dom
npm i --save-dev @babel/preset-react babel-preset-react-app
```

## File Structure
Follows a typical express layout except we include a components directory where we can render our vanilla JS or React based components into our server-side rendered views.
```
src
  L components              // this is where we combine our JS and view templates
    L helloWorld            // e.g vanilla JS component 
      L index.js
      L template.hbs
    L reactHelloWorld       // e.g React component 
      L index.js
      L template.hbs
  L public              
    L js                    // bundled by webpack and linked to by component templates
      L helloWorld.js
      L reactHelloWorld.js
  L routes                  // basic express routes
  L util                    // helpers we can import across components
    L __test__              // jest test file syntax. Include tests close to components
      L sayHello.spec.js
    L sayHello.js          
  L views                   // views rendered by URL routes
  server.js                 // baic express server

package.json
webpack.config.js
.babelrc
```

## Webpack and Babel
Webpack config as follows. Note we separately bundle our components into different JS files and load them in the appropriate template.hbs.
```javascript
module.exports = {
  entry: {
    helloWorld: './src/components/helloWorld/index.js',
    reactHelloWorld: './src/components/reactHelloWorld/index.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/src/public/js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader'
      }
    }]
  }
};
```

babel.rc file
```json
{
  "presets": [
    "react-app",
    "@babel/preset-react"
  ]
}
```

package.json scripts
```json
  "scripts": {
    "start": "node ./src/server.js",
    "dev": "nodemon ./src/server.js",
    "test": "jest",
    "webpack": "NODE_ENV=development webpack --watch"
  },
```

## General Pattern Instructions
Steps to follow when creating a new component:

### 1. Create new component including a JS and template file
```
src
  L components
    L weatherWidget
      L index.js
      L template.hbs
```

Example JS
```js
// src/components/weatherWidget/index.js
let fetchWeather = require('exampleWeatherAPI')
let $main = document.querySelector('#main')

fetchWeather()
  .then(data => {
    let temp = data.temp
    let msg = `Example weather render is: ${temp}`
    $main.innerHTML = msg
  })
```

Example template which includes the DOM element that JS relies on fetching and includes a script to load the JS that webpack bundles (next step)
```html
<!-- src/components/weatherWidget/template.hbs -->
<h2>Weather widget template</h2>
<div id="main"></div>

<script src="/js/weatherWidget.js"></script>
```

### 2. Update webpack config and bundle
```js
// webpack.config.js
module.exports = {
  entry: {
    helloWorld: './src/components/helloWorld/index.js',
    reactHelloWorld: './src/components/reactHelloWorld/index.js',
    weatherWidget: './src/components/weatherWidget/index.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/src/public/js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader'
      }
    }]
  }
};
```
Run npm script `npm run webpack` and check that file has bundled in the public/js folder

### 3. Load the component as a partial in your express views template

Note when loading as a partial to include the component name and template.hbs file name `{{>weatherWidget/template}}`
```html
<!-- views/helloWorld/index.hbs -->
<i>views/helloWorld/index.hbs</i>

...

<p> This is where my weather widget will go </p>
{{>weatherWidget/template}}
```