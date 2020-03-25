// This file configures the development web server
// which supports hot reloading and synchronized testing.

// Require Browsersync along with webpack and middleware for it
import browserSync from 'browser-sync'
// Required for react-router browserHistory
// see https://github.com/BrowserSync/browser-sync/issues/204#issuecomment-102623643
import historyApiFallback from 'connect-history-api-fallback'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import stripAnsi from 'strip-ansi'
import getConfig from '../webpack.config'

const bs = browserSync.create()

const config = getConfig(true)
const bundler = webpack(config)

bundler.plugin('done', stats => {
  if (stats.hasErrors()) {
    return bs.sockets.emit('fullscreen:message', {
      title: 'Webpack Error:',
      body: stripAnsi(stats.toString()),
      timeout: 100000
    })
  }

  bs.reload()
})

// Run Browsersync and use middleware for Hot Module Replacement
bs.init({
  server: {
    baseDir: 'src',
    middleware: [
      webpackDevMiddleware(bundler, {
        // Dev middleware can't access config, so we provide publicPath
        publicPath: config.output.publicPath,

        // pretty colored output
        stats: { colors: true },

        // Set to false to display a list of each file that is being bundled.
        noInfo: true

      // for other settings see
      // http://webpack.github.io/docs/webpack-dev-middleware.html
      }),

      // bundler should be the same as above
      webpackHotMiddleware(bundler),

      historyApiFallback()
    ]
  },
  plugins: ['bs-fullscreen-message'],
  files: [
    'src/*.html'
  ]
})
