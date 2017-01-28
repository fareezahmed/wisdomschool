var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
// var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var prefix = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var plumber = require('gulp-plumber');


gulp.task('babel', () => {
    return gulp.src('src/app/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('babel:watch', function () {
  gulp.watch('./src/app/*.js', ['babel']);
});

// gulp.task('sass', function () {
//   return gulp.src('./src/sass/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('./src/css'));
// });

function onError(err) {
    console.log(err);
}

gulp.task('sass', function(){
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(prefix('last 2 versions'))
        .pipe(minify())
        .pipe(gulp.dest('./style'))
        .pipe(plumber({
            errorHandler: onError
        }))
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/*.scss', ['sass']);
});

gulp.task('pug', function(){
  gulp.src('./src/**/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./'))
});

gulp.task('pug:watch', function(){
  gulp.watch('./src/**/*.pug',['pug'])
});

// gulp.task('autoprefixer', () =>
//     gulp.src('src/css/*.css')
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//         }))
//         .pipe(gulp.dest('./style'))
// );
//
// gulp.task('auto:watch', function(){
//   gulp.watch('./src/css/*.css',['autoprefixer'])
// });

gulp.task('default', ['pug','sass', 'babel', 'pug:watch','sass:watch','babel:watch'])
