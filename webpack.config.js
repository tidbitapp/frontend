const path = require('path');

module.exports = {

  entry: path.resolve(__dirname, "app/main.js"),

  devtool: "source-map",

  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "main.js",
    publicPath: "assets/"
  },

  resolve: {
    extensions: [".js", ".json", ".css"]
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
        loaders: "file-loader?name=[name].[ext]",
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: "[name]--[local]--[hash:base64:8]"
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }

};
