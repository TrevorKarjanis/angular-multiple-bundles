# Multiple Angular Bundles

This project demonstrates running two distinct, localized [Angular element](https://angular.io/guide/elements) bundles in the same page using [@angular-builders/custom-webpack](https://www.npmjs.com/package/@angular-builders/custom-webpack). For simplicity of implementation, they look the same, but they are two distinct sources and builds.

## Demo

A live demo is available at [https://trevorkarjanis.github.io/angular-multiple-elements](https://trevorkarjanis.github.io/angular-multiple-elements).

## Build

Run `npm run build` to build the project.

## Development Server

Run `npm start` to start a development server at [http://127.0.0.1:8080](http://127.0.0.1:8080/).

## Procedures

1. Install @angular-builders/custom-webpack.

```
npm install --save-dev @angular-builders/custom-webpack
```

2. Configure the builder and custom webpack configuration for each project in angular.json.

```json
"app-element": {
  "projectType": "application",
  ...
  "architect": {
    "build": {
      "builder": "@angular-builders/custom-webpack:browser",
      "options": {
        "customWebpackConfig": {
          "path": "projects/<project name>/webpack.config.js",
          "mergeStrategies": {
            "externals": "replace"
          }
        }
      }
```

3. Create a custom webpack configuration file, webpack.config.js, in each project directory.

4. In each custom webpack configuration, define unique values for the jsonpFunction and library output configuration options ([example](https://github.com/TrevorKarjanis/angular-multiple-elements/blob/238a1bfe40665be0c5988bc90015ad9a08da2ba2/angular.json#L17)).

```javascript
module.exports = {
  output: {
    jsonpFunction: 'webpackJsonp<project name>',
    library: '<project name>'
  }
}
```

5. Build the project.

6. Include each project's runtime, styles, and main bundles in the correct order in the target page. Include the polyfills bundle only once ([example](https://github.com/TrevorKarjanis/angular-multiple-elements/blob/f314993dde3bfa916e611ef9cce1ecf355295330/index.html#L25)).

```html
<script src="app-element/runtime.js" defer></script>
<script src="app-element/polyfills.js" defer></script>
<script src="app-element/styles.js" defer></script>
<script src="app-element/main.js" defer></script>
<script src="app-element-2/runtime.js" defer></script>
<script src="app-element-2/styles.js" defer></script>
<script src="app-element-2/main.js" defer></script>
```

## Optimization

This project demonstrates running multiple elements with separate Angular runtimes. It is preferred, however, to include multiple elements in one bundle that utilizes a single instance of the framework and unique chunks. In some cases, it may be reasonable to distribute all elements in a single bundle built from a selfcontained, unbootstrapped "application" build. Optimally, the components would be distributed in an Angular library and either defined as custom elements in independent modules or bundled per consuming application.