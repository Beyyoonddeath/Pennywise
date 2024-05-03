import gulp from 'gulp';
import webpackStream from 'webpack-stream';
import es6transpiler from 'gulp-es6-transpiler';

function compileScript() {
    return gulp.src('src/**/*.js')
        .pipe(webpackStream({
            mode: 'production',
            output: {
                filename: 'islandHelper.min.js'
            },
        }))
        .pipe(gulp.dest('release'));
}

gulp.task('default', () => {
    gulp.watch(['src/**/*.js'], compileScript);
})