/**
 * Gulp configuration
 */

var config = {
  dest: {
    scss: 'dist/css',
    modules: 'dist/modules',
    icons: 'src/icons'
  },
  src: {
    scss: 'src/scss/main.scss',
    modules: 'src/modules/**/*',
    icons: 'src/icons/*.svg'
  }
}

module.exports = config
