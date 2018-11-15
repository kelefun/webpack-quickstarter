const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // absolute path for project root
    context: path.resolve(__dirname, 'src'),
    entry: {
      // relative path declaration
      index: './view/index.js',
    },
    output: {
      // absolute path declaration
      path: path.resolve(__dirname, 'dist'),
      filename: './assets/js/[name].[chunkhash].js',
    },
    module: {
      rules: [
        // babel-loader with 'env' preset
        { test: /\.js$/, include: /src/, exclude: /node_modules/, use: { loader: "babel-loader", options: { presets: ['env'] } } },
        // html-loader
        // {
        //   test: /\.html$/,
        //   use: [
        //     {
        //       loader: "html-loader",
        //     },
        //   ]
        // },
        // url-loader(for images)
        { test: /\.(jpg|png|gif|svg)$/, use: [{ loader: 'url-loader', options: { limit: 5120, name: '[name].[ext]', outputPath: './assets/media/' } }] },
        // file-loader(for fonts)
        { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] }
      ]
    },
    plugins: [
      // cleaning up only 'dist' folder
      new CleanWebpackPlugin(['dist']),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "./assets/css/[name].[hash].css",
        chunkFilename: "./assets/css/[id].[hash].css"
      }),
      new HtmlWebpackPlugin({
        minify: false,
        template: './view/index.html',
        loader: 'html-loader'
      }),
    ],
  
  };