const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const Webpack = require("webpack");

module.exports = {
  mode: "development", // 开发模式
  entry: ["@babel/polyfill", path.resolve(__dirname, "../src/index.js")], // 打包的起点
  output: {
    filename: "[name].[hash:8].js", // 打包后文件名
    path: path.resolve(__dirname, "../dist") // 输出目录
  },
  devServer: {
    contentBase: "../dist", // 服务器内容的来源
    hot: true, // 是否热更新
    open: true, // 是否自动在浏览器打开
    port: "3000" // 端口号
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: { postcssOptions: { plugins: ["autoprefixer"] } }
          }
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          "vue-style-loader",
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: { postcssOptions: { plugins: ["autoprefixer"] } }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env"] }
          }
        ],
        exclude: /node_modules/
      },
      { test: /\.vue$/, use: ["vue-loader"] }
    ]
  },
  resolve: {
    // 创建 import 或 resolve 的别名
    alias: {
      "@": path.resolve(__dirname, "../src"),
      vue$: "vue/dist/vue.runtime.esm.js"
    },
    // 尝试按顺序解析后缀名
    extensions: [".vue", "..."]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html")
    }),
    new VueLoaderPlugin(),
    new Webpack.HotModuleReplacementPlugin()
  ]
};
