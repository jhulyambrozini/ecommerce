
const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const images = require('gulp-images')


function tarefasCSS() {

    return gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.css',
                    './vendor/owl/css/owl.carousel.css',
                    './node_modules/@fortawesome/fontawesome-free/css/fontawesome.css',
                    './src/css/style.css' 
                ])

            .pipe(concat('styles.css'))
            .pipe(cssmin())
            .pipe(rename({ suffix: '.min'})) //styles.min.css
            .pipe(gulp.dest('./dist/css'))
}

function tarefasJS() {

    return gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './vendor/jquery-mask/jquery.mask.js',
        './vendor/owl/js/owl.carousel.js',
        './vendor/jquery-ui/jquery-ui.js',
        './src/js/custom.js'
    ])

            .pipe(concat('scripts.js'))
            .pipe(uglify())
            .pipe(rename({ suffix: '.min'})) //scripts.min.js
            .pipe(gulp.dest('./dist/js'))
}

function tarefasImagem() {

    return gulp.src('./src/images/*')

            .pipe(images({
                pngquant: true,
                optLipng: false,
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
exports.scripts = tarefasJS
exports.images = tarefasImagem