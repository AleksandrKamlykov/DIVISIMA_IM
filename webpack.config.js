"use strict";

let path = require("path");

module.exports = {
  mode: "development",
  entry: "./js/index.js",
  output: {
    filename: "bundle.js",
    path: __dirname + "/js",
  },
  watch: true,

  devtool: "source-map",

  resolve: {
    alias: {
      path: require.resolve("path-browserify"),
    },
  },
};
