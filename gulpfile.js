const gulp = require('gulp');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const image = require('gulp-image');
const stripCss = require('gulp-strip-css-comments');
const stripJs = require('gulp-strip-comments');

function tarefasCSS() {

    return gulp.src([
        './node_modules/bootstrap/dist/css/bootstrap.css',
        './node_modules/@fortawesome/fontawesome-free/css/fontawesome.css',
        './vendor/owl/css/owl.css',
        './vendor/jquery-ui/jquery-ui.css',
        './src/css/style.css'        ])
        .pipe(stripCss({ preserve: false }))
        .pipe(concat('styles.css'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/css'))

}


function tarefasFonts() {

    return gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest('./dist/webfonts'))
}


function tarefasJS() {

    return gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './node_modules/@fortawesome/fontawesome-free/js/fontawesome.js',
        './node_modules/@fortawesome/fontawesome-free/js/brands.js',
        './vendor/owl/js/owl.js',
        './vendor/jquery-mask/jquery.mask.js',
        './vendor/jquery-ui/jquery-ui.js',
        './src/js/custom.js',
        './src/js/products.js'])
        .pipe(stripJs())
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/js'))

}

function tarefasImagem() {

    return gulp.src('./src/images/*')
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
}

exports.styles = tarefasCSS
exports.fonts = tarefasFonts
exports.scripts = tarefasJS
exports.images = tarefasImagem
