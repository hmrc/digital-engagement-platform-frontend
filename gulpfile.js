'use strict';

var gulp = require('gulp'),
requireDir = require('require-dir');
requireDir('./gulpUtils', { recurse: true });

//By default we just run the tests.
gulp.task('default', ['test']);