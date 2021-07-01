const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin");
const { merge } = require("webpack-merge");
const WebpackConfig = require("./webpack.config");

module.exports = merge(WebpackConfig, {
  mode: "production", // 开发模式
  optimization: {
    minimizer: [
      new UglifyjsWebpackPlugin({ cache: true, parallel: true }),
      new OptimizeCssAssetsWebpackPlugin({})
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        libs: {
          chunks: "initial",
          name: "chunk-libs",
          priority: 10,
          test: /node_modules/
        }
      }
    }
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          globOptions: {
            ignore: [path.resolve(__dirname, "../public", "index.html")]
          }
        }
      ]
    })
  ]
});
