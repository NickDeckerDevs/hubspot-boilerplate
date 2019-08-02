/**
 * Gulp configuration
 */

var config = {
  dest: {
    scss: 'dist/css',
    modules: 'dist/modules'
  },
  src: {
    scss: 'src/scss/main.scss',
    modules: 'src/modules/**/*'
  }
}

module.exports = config
