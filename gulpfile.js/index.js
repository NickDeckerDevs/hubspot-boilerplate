const { series, src, dest } = require('gulp')
const plugins = require('gulp-load-plugins')({ camelize: true })
const config = require('../gulpconfig.js')
const del = require('del')
const fs = require('fs')
const path = require('path')

function buildScss() {
  return src(config.src.scss)
    .pipe(plugins.sassGlobImport())
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer('last 3 version'))
    .pipe(plugins.cleanCss())
    .pipe(dest(config.dest.scss))
}

function buildModules() {
  return src([
    'src/modules/**/*',
    '!src/modules/**/fields/*' //exclude
  ]).pipe(dest(config.dest.modules))
}

function buildIcons() {
  return src(config.src.icons)
    .pipe(
      plugins.svgmin({
        plugins: [
          {
            removeViewBox: false
          }
        ]
      })
    )
    .pipe(
      plugins.svgstore({
        inlineSvg: true,
        cleanup: true
      })
    )
    .pipe(
      plugins.cheerio(function($) {
        $('svg').attr('style', 'display:none')
      })
    )
    .pipe(dest(config.dest.icons))
}

function cleanIcons() {
  return del(['src/modules/bb_icons.module/module.html'])
}

function copyIcons() {
  return src('src/icons/icons.svg')
    .pipe(plugins.extReplace('.html'))
    .pipe(plugins.rename({ basename: 'module' }))
    .pipe(dest('src/modules/bb_icons.module/'))
}

function buildModuleFields(cb) {
  // Get path to /src/modules
  const jsonPath = path.join(__dirname, '..', 'src', 'modules')

  // Try to read the directory...
  fs.readdir(jsonPath, function(err, files) {
    // If no directory found...
    if (err) {
      console.error('Could not list the directory.', err)
      process.exit(1)
    }

    // Loop through all folders in the directory
    files.forEach(function(file) {
      // Get path to /src/modules/{module}/fields/fields.js
      let jsonPath = path.join(__dirname, '..', 'src', 'modules', file, 'fields', 'fields.js')

      // Skip if file doesn't exist...
      if (!fs.existsSync(jsonPath)) return false

      // Config file that lists all .json files
      const fields = require(`../src/modules/${file}/fields/fields.js`)

      // Merge all .json files into fields.json
      return src(fields.config())
        .pipe(plugins.concat('fields.json', { newLine: ',\n' }))
        .pipe(plugins.header('['))
        .pipe(plugins.footer(']'))
        .pipe(dest(`src/modules/${file}/`))
    })
  })

  // Gulp needs this to finish up the function
  cb()
}

function buildMacros() {
  return src(config.src.macros).pipe(dest(config.dest.macros))
}

exports.build = series(buildScss, buildIcons, cleanIcons, copyIcons, buildMacros, buildModuleFields, buildModules)
