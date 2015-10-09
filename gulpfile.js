var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    concatCss = require('gulp-concat-css'),
    concatJs = require('gulp-concat'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    nodemon = require('gulp-nodemon'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    run = require('gulp-run'),
    historyApiFallback = require('connect-history-api-fallback');


/* ---------------------------------------------------
    Examples use command Run
gulp.task('start', function () {
  run('npm restart').exec() 
  .pipe(notify("Node Server Inicio!")); 
});

gulp.task('stop', function () {
  run('taskkill /IM node.exe -F').exec() 
  .pipe(notify("Se detuvo node server!")); 
});
------------------------------------------------------*/

gulp.task('server', function () {
  nodemon({ script: 'bin/www'
          , ext: 'js' })
    .on('restart', function () {
      console.log('restarted!')
    })
})



gulp.task('css', function () 
{
  gulp.src('public/stylesheets/*.css')
    .pipe(concatCss("todo.css"))
    .pipe(minifyCSS({keepBreaks:false}))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(notify("Ha finalizado la task css!"));
});
 

gulp.task('js', function() 
{
  gulp.src('public/javascripts/**/*.js')
    .pipe(concatJs('concat.js'))
    .pipe(gulp.dest('public/includes'))
    .pipe(notify("Su Front ha Sido actualizado!"));
});


gulp.task('watch-front', function() {
  watch('public/javascripts/**/*.js', function() {
    gulp.run(['js']);
  });
});





