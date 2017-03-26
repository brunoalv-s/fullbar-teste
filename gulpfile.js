'use strict'

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    prefix = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'build/'
    }
  });

  gulp.watch('build/assets/sass/**/*.scss', ['sass']);
  // gulp.watch('build/assets/js/**/*.js', ['scripts'])
  gulp.watch('build/**/*.{html,css,js}').on('change', function() {
    browserSync.reload();
  });

});

gulp.task('sass', function(){
  return gulp.src('build/assets/sass/**/*.{sass,scss}')
    .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(prefix({
        browsers: ['last 2 versions'],
        cascade: false
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/assets/css'))
});

gulp.task('scripts', function() {
  return gulp.src('build/assets/js/**/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/assets/js'))
});

gulp.task('images', function() {
  return gulp.src('build/assets/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('build/assets/images'))
});

// Apenas move o arquivo Json
gulp.task('move', function() {
  return gulp.src('build/assets/js/*.json')
  .pipe(gulp.dest('app/assets/js'))
});

gulp.task('default', ['sass', 'scripts', 'images', 'browserSync']);
