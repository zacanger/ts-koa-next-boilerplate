const { exec } = require('child_process')
const { promisify } = require('util')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  generateEtags: true,
  generateBuildId: async () => {
    const ex = promisify(exec)
    const { stdout } = await ex(
      'git describe --exact 2>/dev/null || git rev-parse --short=12 HEAD'
    )
    return stdout.toLowerCase()
  },
  webpack: (config) => {
    config.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          safari10: true,
        },
      }),
    ]

    const originalEntry = config.entry
    config.entry = async () => {
      const entries = await originalEntry()

      if (
      entries['main.js'] &&
        !entries['main.js'].includes('./src/utils/polyfills.js')
    ) {
        entries['main.js'].unshift('./src/utils/polyfills.js')
      }

      return entries
    }

    return config
  },
}
