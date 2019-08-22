/**
 * Main.js
 *
 * @since 1.0.0
 */

// import Raven from 'raven-js'
import 'smoothscroll'
import 'objectFitPolyfill'
import objectFitImages from 'object-fit-images'

$(function() {
  if (process.env.NODE_ENV === 'production') {
    // Raven
    // .config()
    // .install()
  }

  objectFitImages()
})
