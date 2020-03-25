import webpack from 'webpack'
import getConfig from '../webpack.config'

process.env.NODE_ENV = 'production'

const config = getConfig(false)

webpack(config).run((err, stats) => {
  if (err) { // so a fatal error occurred. Stop here.
    console.error(err)
    process.exit(1)
  }

  const jsonStats = stats.toJson()

  if (stats.hasErrors()) {
    jsonStats.errors.forEach(err => console.error(err))
    process.exit(1)
  }

  // If we got this far, the build succeeded
  console.log('Your app is compiled in production mode in /dist. It\'s ready to roll!')
})
