const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  mode: 'development',
  entry: { //use an obj for multiple entries
    bundle: path.resolve(__dirname, 'src/index.js'),
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js', //the [contenthash] is to always generate random figure/letters to deal with caching 
    clean: true //this is to keep one bundle file in the dist dir
  },

  devtool: 'source-map', //for debugging

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist') 
    },
    port: 3000,
    open: true, //this is to open the browser automatically
    hot: true,
    compress: true,
    historyApiFallback: true
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'index.html',
      template: 'src/template.html'
    })
  ]
}