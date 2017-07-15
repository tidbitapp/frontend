const path = require('path');

module.exports = {

  entry: path.resolve(__dirname, "app/main.js"),

  devtool: "source-map",

  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "main.js",
    publicPath: "assets/"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loaders: ["react-hot-loader", "babel-loader"]
      },
      {
        test: /\.html$/,
        loader: "file-loader?name=[name].[ext]",
      }
    ]
  }

};
