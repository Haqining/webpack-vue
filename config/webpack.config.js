const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const isDevelopment = process.argv.indexOf("--mode=production") === -1;

module.exports = {
  entry: [
    isDevelopment && "@babel/polyfill",
    path.resolve(__dirname, "../src/index.js")
  ].filter(Boolean), // 打包的起点
  output: {
    filename: "js/[name].[hash:8].js", // 打包后文件名
    path: path.resolve(__dirname, "../dist") // 输出目录
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: isDevelopment
              ? "vue-style-loader"
              : MiniCssExtractPlugin.loader,
            options: { hmr: isDevelopment }
          },
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
          {
            loader: isDevelopment
              ? "vue-style-loader"
              : MiniCssExtractPlugin.loader,
            options: { hmr: isDevelopment }
          },
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
      vue$: "vue/dist/vue.runtime.esm"
    },
    // 尝试按顺序解析后缀名
    extensions: [".vue", "..."]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html")
    }),
    new MiniCssExtractPlugin({ filename: "style/[name].[hash].css" }),
    new VueLoaderPlugin()
  ]
};
