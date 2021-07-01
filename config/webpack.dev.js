const Webpack = require("webpack");
const { merge } = require("webpack-merge");
const WebpackConfig = require("./webpack.config");

module.exports = merge(WebpackConfig, {
  mode: "development", // 开发模式
  devServer: {
    contentBase: "../dist", // 服务器内容的来源
    hot: true, // 是否热更新
    open: true, // 是否自动在浏览器打开
    port: "3000" // 端口号
  },
  devtool: "source-map",
  plugins: [new Webpack.HotModuleReplacementPlugin()]
});
