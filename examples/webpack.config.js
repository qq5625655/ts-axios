const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');


const entry = {}; 
const htmlWebpackPlugins = [];
console.log(path.resolve(__dirname));
const entryFiles = glob.sync(path.resolve(__dirname, "*/app.ts"));
// 遍历文件集合，生成所需要的 entry、htmlWebpackPlugins 集合
entryFiles.map((item, index) => {
    const match = item.match(/examples\/(.*)\/app\.ts$/);
    const pageName = match?.[1];
    entry[pageName] = item;
    console.log(pageName);
    // 多页面所需要的模板集合
    htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
            title: pageName,
            filename: `${pageName}.html`,
            template: path.join(__dirname, `${pageName}/index.html`),
            chunks: [pageName]
        })
    )
})
module.exports = {
  /**
   * 我们会在 examples 目录下建多个子目录
   * 我们会把不同章节的 demo 放到不同的子目录中
   * 每个子目录的下会创建一个 app.ts
   * app.ts 作为 webpack 构建的入口文件
   * entries 收集了多目录个入口文件，并且每个入口还引入了一个用于热更新的文件
   * entries 是一个对象，key 为目录名
   */
//   entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
//     const fullDir = path.join(__dirname, dir);
//     const entry = path.join(fullDir, "app.ts");
//     if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
//       entries[dir] = entry;
//     }
//     return entries;
//   }, {}),
    entry,
  /**
   * 根据不同的目录名称，打包生成目标 js，名称和目录名一致
   */
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js",
    // publicPath: "/build/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
        {
            test: /\.(t|j)s$/,
            use: 'babel-loader',
        },
    ]
  },
  devServer: {
    // noInfo: true,
    // static: {
    //     directory: path.join(__dirname, "/build/"),
    // },
    // client:{
    //     overlay: true,
    // },
    open: true,
    proxy: {
      // 配置跨域
      "/api/": {
        target: "http://localhost:3000",
        ws: true,
        changOrigin: true
      }
    },
    hot: true,
    // port: 8000,
    // host: "192.168.1.106",


  },
  
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    ...htmlWebpackPlugins,
    // new HtmlWebpackPlugin({
    //     template: path.join(__dirname, '../index.html'),
    // }),
  ]

};