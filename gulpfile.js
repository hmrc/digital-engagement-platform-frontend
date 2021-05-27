'use strict';

var gulp = require('gulp');
const del = require('del');
var jest = require('gulp-jest').default;
const rollup = require('rollup-stream');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const rollupJS = (inputFile, options) => {
  return () => {
    return rollup({
      input: options.basePath + inputFile,
      format: options.format,
      sourcemap: options.sourcemap
    })
    .pipe(source(inputFile, options.basePath))
    .pipe(buffer())
    .pipe(gulp.dest(options.distPath));
  };
}
 
gulp.task('jest', function () {
  return gulp.src('./test/javascripts/').pipe(jest({
    "testRegex": "((\\.|/*.)(spec))\\.js?$",
    "automock": false,
    "verbose": true
  }));
});

gulp.task('clean:node_modules', function () {
  return del(['node_modules'], {force: true});
});

gulp.task('bundle', rollupJS('gtm_dl.js', {
  basePath: './app/assets/javascripts/',
  format: 'iife',
  distPath: './app/assets/javascripts/bundle',
  sourcemap: false
}));

gulp.task('bundle_ci_api', rollupJS('ci_api.js', {
  basePath: './app/assets/javascripts/ci_api/',
  format: 'iife',
  distPath: './app/assets/javascripts/ci_api_bundle',
  sourcemap: false
}));
