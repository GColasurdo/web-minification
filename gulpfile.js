// Include gulp
var gulp = require('gulp');

// Include Plugins
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var cssnano = require('gulp-cssnano');

// Environment Variables
var bldSource = 'builds/development';
var bldProd = 'builds/production';

// Start Task
gulp.task('start', function() {
  return gutil.log('Gulp is running!')
});

// Lint Task
gulp.task('lint', function() {
  return gulp.src('builds/development/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src(bldSource + '/js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest(bldProd + '/js'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(bldProd + '/js'));
});

// Concatenate & Minify CSS
gulp.task('css', function() {
  return gulp.src(bldSource + '/css/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest(bldProd + '/css'))
    .pipe(cssnano())
    .pipe(gulp.dest(bldProd + '/css/'))
});

// Minify HTML
gulp.task('html', function() {
  gulp.src(bldSource + '/*.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest(bldProd));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(bldSource + '/js/*.js', ['lint', 'scripts']);
    gulp.watch(bldSource + '/css/*.css', ['css']);
});

// Default Tasks
gulp.task('default', ['start', 'lint', 'watch']);
gulp.task('htmlcrunch', ['scripts', 'css', 'html']);
