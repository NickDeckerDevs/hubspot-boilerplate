const { series, src, dest } = require('gulp')
const plugins = require('gulp-load-plugins')({ camelize: true })
const config = require('../gulpconfig.js')
const del = require('del');

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

function buildIcons (cb) {
  return src(config.src.icons)
    .pipe(plugins.svgmin({
      plugins: [{
        removeViewBox: false
      }]
    }))
    .pipe(plugins.svgstore({
      inlineSvg: true,
      cleanup: true
    }))
    .pipe(plugins.cheerio(function ($) {
      $('svg').attr('style', 'display:none')
    }))
    .pipe(dest(config.dest.icons))
}

function cleanIcons (cb) {
  return del([
    'src/modules/icons.module/module.html',
  ]);
}

function copyIcons (cb) {
  return src('src/icons/icons.svg')
    .pipe(plugins.extReplace('.html'))
    .pipe(plugins.rename({ basename: 'module' }))
    .pipe(dest('src/modules/icons.module/'))
}


exports.build = series(
  buildScss,
  buildIcons,
  cleanIcons,
  copyIcons,
  buildModules
)