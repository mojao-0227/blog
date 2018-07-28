// Hexoを使えるようにする（公式APIより）
const Hexo = require('hexo');
const hexo = new Hexo(process.cwd(), {});

// Hexoサーバーを立ち上げるタスク
gulp.task('server', function(cb) {
    hexo.init().then(function() {
        return hexo.call('server', {
        });
    }).then(function() {
        return hexo.exit();
    }).then(function() {
        return cb();
    }).catch(function(err) {
        console.log(err);
        hexo.exit(err);
        return cb(err);
    });
});

// Hexoブログをブラウザで開くタスク
gulp.task('open', () => {
    return gulp.src('./')
        .pipe(exec('open http://localhost:4000'))
});

// デフォルトタスク：Hexoサーバーの立ち上げが終わったらブラウザで開く
gulp.task('default', gulp.series('server', 'open', 'watch'));