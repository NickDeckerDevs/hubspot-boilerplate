const { series, src, dest } = require('gulp')
const plugins = require('gulp-load-plugins')({ camelize: true })
const config = require('../gulpconfig.js')

function defaultTask(cb) {
  // place code for your default task here
  cb();
}

function buildScss (cb) {
  return src(config.src.scss)
    .pipe(plugins.sassGlobImport())
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer('last 3 version'))
    .pipe(plugins.cleanCss())
    .pipe(dest(config.dest.scss))
}

function buildModules (cb) {
  return src(config.src.modules)
  .pipe(dest(config.dest.modules))
}


exports.build = series(
  defaultTask,
  buildScss,
  buildModules
)