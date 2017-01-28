var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');

gulp.task('babel', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('babel:watch', function () {
  gulp.watch('./src/**/*.js', ['sass']);
});

gulp.task('sass', function () {
  return gulp.src('./src/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/**/*.sass', ['sass']);
});

gulp.task('pug', function(){
  gulp.src('./src/**/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./'))
});

gulp.task('watch', function(){
  gulp.watch('./src/**/*.pug',['pug'])
});

gulp.task('autoprefixer', () =>
    gulp.src('src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./style'))
);

gulp.task('auto:watch', function(){
  gulp.watch('./src/css/*.css',['autoprefixer'])
});

gulp.task('default', ['watch','sass:watch','babel:watch', 'auto:watch'])
