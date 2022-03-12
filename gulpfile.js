const gulp = require('gulp');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const image = require('gulp-image');
const stripCss = require('gulp-strip-css-comments');
const stripJs = require('gulp-strip-comments');
const htmlmin = require('gulp-htmlmin');
const { parallel } = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

function tarefasCSS(callback) {

    gulp.src([
        './node_modules/bootstrap/dist/css/bootstrap.css',
        './node_modules/@fortawesome/fontawesome-free/css/fontawesome.css',
        './vendor/owl/css/owl.css',
        './vendor/jquery-ui/jquery-ui.css',
        './src/css/style.css'])
        .pipe(stripCss({ preserve: false }))
        .pipe(concat('styles.css'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/css'))

    return callback();

}


function tarefasFonts(callback) {

    gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest('./dist/webfonts'))

    return callback();

}


function tarefasJS(callback) {

    gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './node_modules/@fortawesome/fontawesome-free/js/fontawesome.js',
        './node_modules/@fortawesome/fontawesome-free/js/brands.js',
        './vendor/owl/js/owl.js',
        './vendor/jquery-mask/jquery.mask.js',
        './vendor/jquery-ui/jquery-ui.js',
        './src/js/custom.js',
        './src/js/products.js'])
        // .pipe(stripJs())
        .pipe(babel({
            comments: false,
            presets: ['@babel/env']
        }))
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/js'))

    return callback();

}

function tarefasImagem(callback) {

    gulp.src('./src/images/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true
        }))
        .pipe(gulp.dest('./dist/images'))

    return callback();
}

function tarefasHTML(callback) {

    gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'))

    return callback();

}

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    gulp.watch('./src/**/*').on('change', process); // executa tasks
    gulp.watch('./src/**/*').on('change', reload); // atualiza página
})

exports.styles = tarefasCSS;
exports.fonts = tarefasFonts;
exports.scripts = tarefasJS;
exports.images = tarefasImagem;
exports.html = tarefasHTML;

function endTaks(cb) {
    console.log('tarefas concluídas');
    return cb();
}

const process = parallel(tarefasHTML, tarefasJS, tarefasCSS, tarefasFonts, endTaks);

exports.default = process;
