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
const { merge } = require("webpack-merge");
console.log("merge", merge);
const common = require("./webpack.common.js");

module.exports = merge(common, {
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
});
