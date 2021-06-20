const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // 开发模式
  entry: ["@babel/polyfill", path.resolve(__dirname, "../src/index.js")], // 打包的起点
  output: {
    filename: "[name].[hash:8].js", // 打包后文件名
    path: path.resolve(__dirname, "../dist") // 输出目录
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"] // 从右向左解析
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: { postcssOptions: { plugins: ["autoprefixer"] } }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(jpe?g|png|svg|ico)$/,
        type: "asset",
        generator: { filename: "images/[hash][ext][query]" }
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
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html")
    }),
    new MiniCssExtractPlugin({ filename: "[name].[hash].css" })
  ]
};
