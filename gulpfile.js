var gulp = require('gulp'),
	minifyCSS = require('gulp-minify-css'),
	concatCss = require('gulp-concat-css'),
	concatJs = require('gulp-concat'),
  notify = require('gulp-notify'),
	uglify = require('gulp-uglify'),
  connect = require('gulp-connect'),
  historyApiFallback = require('connect-history-api-fallback');
 
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
    .pipe(notify("Ha finalizado la tarea js!"));
});


gulp.task('js2', function() 
{
  gulp.src('public/javascripts/angular/*.js')
    .pipe(concatJs('concat.js'))
    .pipe(uglify())
    .pipe(gulp.dest('out/js'))
    .pipe(notify("Ha finalizado la task js!"));
});


gulp.task("uglify-src", function() {
    gulp.src([ "public/javascripts/*.js" ])
    .pipe(concatJs("afvs.js"))
    .pipe(ignore.exclude([ "**/*.map" ]))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

gulp.task('server', function() {
    connect.server({ 
        root: './app', 
        hostname: '127.0.0.1', 
        port: 6000, 
        livereload: true, 
        middleware: function(connect, opt) {
            return [ historyApiFallback ];
        } 
    })
});