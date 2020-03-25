import webpack from 'webpack'
import path from 'path'

export default (dev) => ({
  devtool: dev ? 'eval-source-map' : 'source-map',
  output: {
    publicPath: 'http://localhost:3000/',
    path: `${__dirname}/dist`, // Note: Physical files are only output by the production build task `npm run build`.
    filename: '[name].js',
    pathinfo: dev
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(dev ? 'development' : 'production')
      }
    }),
    ...(dev ?
      [
        new webpack.NoErrorsPlugin()
      ] : [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
      ]
    )
  ],
  debug: dev,
  noInfo: true, // set to false to see a list of every file being bundled.
  entry: {
    'darts-client': './src/index'
  },
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  module: {
    loaders: [
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'file-loader?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader?limit=10000&mimetype=image/svg+xml'},
      {test: /\.(jpe?g|png|gif)$/i, loaders: ['file']},
      {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['eslint']},
      {test: /(\.css)$/, loader: 'style!css'}
    ]
  },
  eslint: {
    emitWarning: dev
  }
})
