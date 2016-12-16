const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const autoprefixer = require('gulp-autoprefixer');
const config = require('../config');
const replace = require('gulp-replace');
const gulpIf = require('gulp-if');
const concat = require('gulp-concat');



gulp.task('scss:copy', function(cb){
  return gulp.src([config.sourcepath + '/components/**/*.scss'])
    .pipe(
      gulpIf(
        !config.options.withCss,
        replace(/\:scope(?:\/\*([^\*]+)\*\/)/, function(a,b){
          return '[data-is="riot-' + b + '"]'
          }
        )
      )
    )
    .pipe(gulp.dest(config.cachepath + '/components'));
})

gulp.task('css',['scss:copy'], function(){
  return sass(config.cachepath + '/components/**/*.scss')
    .on('error', sass.logError)
    .pipe(
      autoprefixer(config.autoprefixer)
    )
    .pipe(gulp.dest(config.cachepath + '/components'))
    .pipe(gulpIf(!config.options.withCss, concat('riot-component.css')))
})

gulp.task('css:noCss',['scss:copy'], function(){
  return sass(config.cachepath + '/components/**/*.scss')
    .on('error', sass.logError)
    .pipe(
      autoprefixer(config.autoprefixer)
    )
    .pipe(concat('riot-component.css'))
    .pipe(gulp.dest(config.destpath))
});
gulp.task('scss:copy:ts', function(cb){
  return gulp.src([config.sourcepath + '/components/**/*.scss'])
    .pipe(
      gulpIf(
        true,
        replace(/\:scope(?:\/\*([^\*]+)\*\/)/, function(a,b){
          return '[data-is="riot-' + b + '"]'
          }
        )
      )
    )
    .pipe(gulp.dest(config.cachepath + '/components'));
})
gulp.task('css:ts', ['scss:copy:ts'], function(){
  return sass(config.cachepath + '/components/**/*.scss')
    .on('error', sass.logError)
    .pipe(
      autoprefixer(config.autoprefixer)
    )
    .pipe(gulp.dest(config.sourcepath + '/components'))
})