var gulp = require('gulp');

// 用来css压缩代码
var cssNano = require('gulp-cssnano');

// 启动服务器，并且可以浏览器同步
var browserSync = require('browser-sync');

// gulp-uglify
// gulp-imagemin

// 创建一个任务，用来压缩css
gulp.task('style', function () {
    gulp.src('./src/css/*.css')
    .pipe(cssNano())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

var htmlmin = require('gulp-htmlmin');

gulp.task('html', function () {
     var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    }
    gulp.src('./src/*.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({
          stream: true
        }))
});

// 图片压缩
// var imgMinify = require('gulp-imagemin');
var imgMinify = require('gulp-smushit');

gulp.task('imgs', function () {
    gulp.src(['./src/images/*.png', 'images/*.jpg'])
    .pipe(imgMinify({verbose: true}))
    .pipe(gulp.dest('./dist/images/'))
})


// js压缩，混淆
// gulp-uglify
var jsMinify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('js', function () {
    gulp.src('src/js/*.js')
    .pipe(concat("all.js"))
    .pipe(jsMinify())
    .pipe(gulp.dest('dist/js/'))
});



// gulp.task('jianting', function(){
//     gulp.watch('src/css/*.css', ['style'])
// })


gulp.task('servers', function () {
     browserSync({
            server: {baseDir: ['dist/']}
        }, function(err, bs) {

            console.log(bs.options.getIn(["urls", "local"]));
    });
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/css/*.css', ['style']);
    gulp.watch('src/*.html', ['html']);

})

gulp.task('mainTask', ['html', 'style', 'js', 'servers']);









