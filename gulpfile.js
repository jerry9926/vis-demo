/**
 * Created by zhijie.huang on 2017/3/7.
 */
var gulp = require('gulp');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

// 监视文件改动并重新载入
gulp.task('serve', function() {
    console.log('task serve running');

    browserSync({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch(['src/**', '!src/examples', '!src/examples/**'], ['reload']);
});

gulp.task('reload', ['copy'], function () {
    reload();
});

gulp.task('default', ['serve'], function() {
    console.log('task default running');
});

gulp.task('default2', function() {
    console.log('task default running');

    var watcher = gulp.watch(['src/**', '!src/examples', '!src/examples/**'], ['copy']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('copy', function() {
    var stream = gulp.src(['src/**', '!src/examples', '!src/examples/**']).pipe(gulp.dest('dist'));
    // 返回stream 以正确实现异步任务
    return stream;
});

