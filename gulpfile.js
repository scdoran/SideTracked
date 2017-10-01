const gulp = require('gulp');
const stream = require('gulp-stream');
const autoprefixer = require('gulp-autoprefixer');
const watch = require('gulp-watch');
const rename = require('gulp-rename');
// CSS
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
// JS
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
// Browser sync
const browserSync = require('browser-sync');

const paths = {
  scripts: 'assets/js/app.js',
  sass: 'assets/sass/one-page-wonder.scss',
  images: 'assets/images/**/*'
};

gulp.task('browserSync', ['sass', 'js'], () =>{
  browserSync.init({
    port: 8080,
    server: {
      baseDir: '/index.html'
    }
  });
});

gulp.task('sass',  ()=>  {
  const scssStream = gulp.src('./assets/sass/**/*.scss')
    .pipe(sass({
      errLogToConsole: true
    }));
  return scssStream
    .pipe(autoprefixer())
    .pipe(rename('styles.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});
 
gulp.task('js', () => {
  const jsStream = gulp.src('assets/js/**/*.js')

  return jsStream
    .pipe(concat('scripts.js'))
    .pipe(rename('scripts.min.css'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});
 
// Rerun the task when a file changes 
gulp.task('watch', ['browserSync'], () => {
  gulp.watch('./assets/sass/**/*.scss', ['sass']);
  gulp.watch('/*.html', browserSync.reload);
  gulp.watch('assets/js/**/*.js', browserSync.reload)
});
 
// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['watch', 'js', 'sass']);
gulp.task('build', ['js', 'sass']);