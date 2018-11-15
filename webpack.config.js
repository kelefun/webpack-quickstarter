const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = require('./webpack.base');

module.exports = (env, argv) => {
  console.log('env=' + env + ',argv=' + JSON.stringify(argv) );
  let server = argv.server;
  let result;
  if (argv.mode === 'development') {//merge 开发环境独有配置
    result= merge(config, {
      devtool: 'inline-source-map',
      devServer: {
        contentBase: path.join(__dirname, 'dist'),
        open: true,
        host: 'localhost', // 0.0.0.0 localhost
        port: 8088,
      }
    });
  } else {//merge 生产环境独有配置
    result= merge(config, {
      optimization: {
        splitChunks: {
          cacheGroups: {
            commons: {
              name: "commons",
              chunks: "initial",
              minChunks: 2
            }
          }
        }
      }
    });
  }
  //merge 公共配置,但vlaue稍有区别
  result= merge(result, {
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            server ? 'style-loader' : MiniCssExtractPlugin.loader ,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        }
      ]
    }
  });
// console.log(result);
  return result;
}; 