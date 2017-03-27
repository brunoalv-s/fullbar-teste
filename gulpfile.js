'use strict'

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    prefix = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-minify-html'),
    cssmin = require('gulp-clean-css');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    }
  });

  gulp.watch('build/assets/sass/**/*.scss', ['sass']);
  gulp.watch('build/assets/js/**/*.js', ['scripts'])
  gulp.watch('app/**/*.{html,css,js}').on('change', function() {
    browserSync.reload();
  });

});

gulp.task('htmlmin', function() {
  return gulp.src('build/**/*.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('app'))
})

gulp.task('sass', function(){
  return gulp.src('build/assets/sass/**/*.{sass,scss}')
    .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(cssmin())
      .pipe(prefix({
        browsers: ['last 2 versions'],
        cascade: false
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/assets/css'))
});

gulp.task('scripts', function() {
  return gulp.src('build/assets/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('app/assets/js'))
});

gulp.task('images', function() {
  return gulp.src('build/assets/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('app/assets/images'))
});

// Apenas move o arquivo Json
gulp.task('move', function() {
  return gulp.src('build/**/*.json')
  .pipe(gulp.dest('app'))
});

gulp.task('default', ['htmlmin','sass', 'move', 'scripts', 'images', 'browserSync']);
