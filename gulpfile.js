var concat = require('gulp-concat');
const { src, dest, parallel } = require('gulp');
const terser = require('gulp-terser');
const rename = require('gulp-rename');

var concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');

function javascript(cb) {

  var files = ["../lib/jquery.js",
    "../lib/intlTelInput/intTelInput.js",
    "../lib/intlTelInput/intlTelInput-jquery.min.js",
    "../lib/intlTelInput/utils.js",
    "../lib/fancyapps/fancybox.umd.js",
    "../statik/scripts/swiper-bundle.min.js",
    "../scripts/main.js",
    "../js/default.js",
    "../js/site.js"]

  src(files)
    .pipe(concat('bundle.js'))
    .pipe(dest('../statik/bundle/'))
    .pipe(src('../statik/bundle/bundle.js'))
    .pipe(terser())
    .pipe(rename('bundle.min.js'))
    .pipe(dest('../statik/bundle/'));

  cb();
}

function css(cb) {

  var files = [
    "../statik/css/swiper-bundle.min.css",
    "../statik/css/bootstrap.min.css",
    "../statik/css/main.min.css",
    "../css/mobile-header.css",
    "../css/site.css",
    "../lib/intlTelInput/intlTelInput.css",
    "../lib/fancyapps/fancybox.css"
  ]

  src(files)
    .pipe(concatCss('bundle.css'))
    .pipe(dest('../statik/bundle/'))
    .pipe(src('../statik/bundle/bundle.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename('bundle.min.css'))
    .pipe(dest('../statik/bundle/'));
  cb();
}


exports.build = parallel(javascript, css);