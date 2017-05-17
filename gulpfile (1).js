var gulp = require('gulp');

var less = require('gulp-less');

gulp.task('less', function() {
    gulp.src('./src/css/*.less')
    .pipe(less())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('html', function() {
    gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

var browserSync = require('browser-sync');
gulp.task('servers', function() {
 // 在浏览器服务启动后，设置一个观察者，来监视文件的变动，如果文件发生了改变，就来重新执行对应的任务
    browserSync({
            server: {baseDir: ['dist/']}

        }, function(err, bs) {

            console.log(bs.options.getIn(["urls", "local"]));
    });
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/css/*.less', ['less']);
});

gulp.task('mainTask', ['html', 'less', 'servers']);

