const path = require("path");

const app_dir = __dirname + "/";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: app_dir + "src/index.html",
  filename: "index.html",
  inject: "head"
});
const CopyPluginConfig = new CopyPlugin({
  patterns: [{ from: "./static", to: "static/" }]
});

const config = {
  mode: "development",
  entry: app_dir + "src/index.tsx",
  output: {
    path: path.resolve(__dirname + "/output"),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  plugins: [HTMLWebpackPluginConfig, CopyPluginConfig],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false
  },
  devServer: {
    port: 8080,
    hot: true,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*"
    }
  }
};

module.exports = config;
