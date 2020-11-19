# Multiple Angular Elements

This project demonstrates running two distinct [Angular elements](https://angular.io/guide/elements) in the same page using [@angular-builders/custom-webpack](https://www.npmjs.com/package/@angular-builders/custom-webpack). For simplicity of implementation, they look the same, but they are two distinct sources and builds.

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

2. Configure the builder and custom webpack configuration for the project in angular.json.

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

3. Create a custom webpack configuration file, webpack.config.js, in the project directory.

3. In the custom webpack configuration, define unique values for the jsonpFunction and library output configuration options.

```javascript
module.exports = {
  output: {
    jsonpFunction: 'webpackJsonp<project name>',
    library: '<project name>'
  }
}
```

4. Build the project.
