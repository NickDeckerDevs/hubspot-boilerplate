/**
 * Gulp configuration
 */

var config = {
  dest: {
    scss: 'dist/css',
    modules: 'dist/modules',
    icons: 'src/icons',
    macros: 'dist/macros'
  },
  src: {
    scss: 'src/scss/main.scss',
    modules: 'src/modules/**/*',
    icons: 'src/icons/*.svg',
    macros: 'src/macros/*'
  }
}

module.exports = config
