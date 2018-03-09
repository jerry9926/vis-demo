/**
 * Created by zhijie.huang on 2017/3/7.
 */
const fs = require('fs'),
    gulp = require('gulp'),
    browserSync = require('browser-sync'),
    del = require('del'),
    reload = browserSync.reload;


const ENTRY_PATH = 'src',
    OUTPUT_PATH = 'dist',
    INDEX_PATH = 'src/index.html';

// 监视文件改动并重新载入
gulp.task('serve', ['copy'], function() {
    console.log('task serve running');

    browserSync({
        server: {
            baseDir: OUTPUT_PATH
        }
    });

    gulp.watch(['src/**', '!src/examples', '!src/examples/**'], ['reload'], function(cb) {
        cb();
    });
});

gulp.task('reload', ['copy'], function () {
    reload();
});

gulp.task('default', ['serve'], function() {
    console.log('task default running');
});

gulp.task('copy', ['clean', 'createIndex'], function() {
    console.log('task copy running');
    // 返回stream 以正确实现异步任务
    return gulp.src(['src/**', '!src/examples', '!src/examples/**']).pipe(gulp.dest('dist'));
});

gulp.task('clean', function(cb) {
    del(['dist/*.*','dist/**/*']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
        cb();
    });
});

// 生成index.html
gulp.task('createIndex', function(cb) {
    return createIndex().then((data) => {
        // console.log(data);
    }).catch((err) => {
        console.log('task createIndex error: ' + err);
    })
});

function createIndex() {

    function createIndexTemp() {
        let links = [], num = 0;
        const files = fs.readdirSync('src');

        files.map((file) => {
            if (file.match(/demo\d+\.html/)) {
                num++;
                links.push(`${num}. <a href="./${file}">${file}</a>`)
            }
        })
        links = links.join('</br>');

        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>home page</title>
        </head>
        <body>
            <h1>vis-demo homepage</h1>
            ${links}
        </body>
        </html>`
    }

    return new Promise((resolve, reject) => {
        const template = createIndexTemp();
        fs.writeFile(INDEX_PATH, template, function(err) {
            if (err) {
                reject(err);
            }
            resolve('file saved success!');
        })
    })
}