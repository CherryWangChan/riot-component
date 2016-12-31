"use strict";

const gulp = require('gulp');
const config = require('../config');

gulp.task('watch', function(){
  gulp.watch([config.sourcepath + '/components/**/*.scss', config.sourcepath + '/components/**/*.ts', config.sourcepath + '/components/**/*.tag', config.sourcepath + '/index.ts'], ['build:noclean']);
});
