var path              = require('path'),
    webpack           = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    phaserModule      = path.join(__dirname, '/node_modules/phaser/'),
    phaser            = path.join(phaserModule, 'build/custom/phaser-split.js'),
    pixi              = path.join(phaserModule, 'build/custom/pixi.js'),
    p2                = path.join(phaserModule, 'build/custom/p2.js');

module.exports = {
  content: __dirname,

  entry: './src/entry.js',

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.js', '.css'],
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2,
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.html'
    })
  ],

  module: {
    loaders: [
      { test: /pixi\.js/, loader: 'expose?PIXI' },
      { test: /phaser-split\.js$/, loader: 'expose?Phaser' },
      { test: /\.(ttf|png|xml|json|ogg|wav|mp3)/, loader: 'file-loader' },
      { test: /p2\.js/, loader: 'expose?p2' },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.css$/, loaders: ['style', 'css']}
    ]
  },

  devServer: {
    host: "0.0.0.0",
    port: "8000",
    contentBase: './public',
    hot: true,
    historyApiFallback: true
  }
}
