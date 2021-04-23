'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    minify = require('gulp-minify'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    imagemin = require('gulp-imagemin'),
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    iconfontName= 'Icons',
    sassLint = require('gulp-sass-lint');

gulp.task('sass', function() {
  return gulp.src('scss/styles.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['>= 2%'], grid: true}))
    .pipe(gulp.dest('../css'));
});

gulp.task('sass-lint', function () {
    return gulp.src([
        'scss/**/*.scss'
    ])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('scripts', function() {
  return gulp.src('scripts/**')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('../js'));
});

gulp.task('minify-scripts', function() {
  return gulp.src('scripts/**')
    .pipe(concat('scripts.js'))
    .pipe(minify({
      ext:{min:'.min.js'}
    }))
    .pipe(gulp.dest('../js'));
});

gulp.task('minify-styles', function() {
  return gulp.src('scss/styles.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['>= 2%'], grid: true}))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('../css'));
});

gulp.task('iconfont', function() {
  gulp.src(['icons/*.svg'])
    .pipe(iconfontCss({
      fontName: iconfontName,
      targetPath: '../assets/scss/1-Settings/_settings.iconfont.scss',
      fontPath: '../fonts/'
    }))
    .pipe(iconfont({
      fontName: iconfontName,
      formats: ['svg', 'ttf', 'eot', 'woff'],
      normalize: true,
      fontHeight: 1001
    }))
    .pipe(gulp.dest('../fonts'));
});gulp.task('create-iconfont', ['iconfont', 'sass', 'sass-lint', 'minify-styles']);

gulp.task('watch', ['sass', 'sass-lint', 'minify-styles', 'scripts', 'minify-scripts' ], function() {
  gulp.watch(['scss/**/*.scss'], ['sass', 'sass-lint', 'minify-styles']);
  gulp.watch(['scripts/**'], ['scripts', 'minify-scripts']);
});

gulp.task('default', ['watch']);
