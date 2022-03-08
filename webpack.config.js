/*
 * @Descripttion:
 * @TapdLink: https://XXX
 * @DesignsLink: https://XXX
 * @RelatedPersons: XXX[市场]、XXX[产品]、XXX[前端]、XXX[后端]、XXX[设计]
 * @version: 1.0.0
 * @Author: shentong
 * @LastEditors: shentong
 * @Date: 2022-03-02 10:46:51
 */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    hot: true,
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Development",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    moduleIds: "named",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
};
