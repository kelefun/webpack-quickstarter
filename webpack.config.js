const path = require('path'),
  webpack = require('webpack'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

// const extractPlugin = new ExtractTextPlugin({ filename: './assets/css/app.css' });

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
    filename: './assets/js/[name].bundle.js'
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
      // file-loader(for images)
      { test: /\.(jpg|png|gif|svg)$/, use: [{ loader: 'url-loader', options: {limit:5120, name: '[name].[ext]', outputPath: './assets/media/' } }] },
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

  devServer: {
    // static files served from here
    contentBase: path.resolve(__dirname, "./dist/assets/media"),
    compress: true,
    // open app in localhost:2000
    port: 2000,
    stats: 'errors-only',
    open: true
  },
  devtool: 'inline-source-map'
};
module.exports = config;