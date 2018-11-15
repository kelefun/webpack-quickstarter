const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  // absolute path for project root
  context: path.resolve(__dirname, 'src'),
  entry: {
    // relative path declaration
    app: './app.js',
  },
  output: {
    // absolute path declaration
    path: path.resolve(__dirname, 'dist'),
    filename: './assets/js/[name].[chunkhash].js'
  },
  module: {
    rules: [
      // babel-loader with 'env' preset
      { test: /\.js$/, include: /src/, exclude: /node_modules/, use: { loader: "babel-loader", options: { presets: ['env'] } } },
      // html-loader
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ]
      },
      // sass-loader with sourceMap activated
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, 'src', 'assets', 'scss')],
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/assets/css/[name].css",
            },
          },
          {
            loader: "extract-loader",
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          }
        ]
      },
      // url-loader(for images)
      { test: /\.(jpg|png|gif|svg)$/, use: [{ loader: 'url-loader', options: { limit: 5120, name: '[name].[ext]', outputPath: './assets/media/' } }] },
      // file-loader(for fonts)
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] }
    ]
  },

  plugins: [
    // cleaning up only 'dist' folder
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      minify: false,
      template: 'index.html'
    }),
  ],

};

module.exports = (env, argv) => {
  console.log(env);
  if (argv.mode === 'development') {
    return merge(config, {
      devtool: 'inline-source-map',
      devServer: {
        contentBase: path.join(__dirname, 'dist'),
        open: true,
        host: 'localhost', // 0.0.0.0 localhost
        port: 8088,
      }
    });
  } else if (argv.mode === 'production') {
    return merge(config, {
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
      },
      plugins: [
        new UglifyJSPlugin()
      ]
    });
  } else {
    throw new Error("请指定开发环境 --mode development or production");
  }

};