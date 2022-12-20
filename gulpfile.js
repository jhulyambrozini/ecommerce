
const { series, parallel } = require('gulp')
const gulp = require ('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const images = require('gulp-image')
const htmlmin = require('gulp-htmlmin')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload


function tarefasCSS(callback) {

    gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.css',
                    './vendor/owl/css/owl.carousel.css',
                    './node_modules/@fortawesome/fontawesome-free/css/fontawesome.css',
                    './src/css/style.css' 
                ])

            .pipe(concat('styles.css'))
            .pipe(cssmin())
            .pipe(rename({ suffix: '.min'})) //styles.min.css
            .pipe(gulp.dest('./dist/css'))

    return callback()
}

function tarefasJS(callback) {

     gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './vendor/jquery-mask/jquery.mask.js',
        './vendor/owl/js/owl.carousel.js',
        './vendor/jquery-ui/jquery-ui.js',
        './src/js/custom.js'
    ])

            .pipe(babel({
                comments: false,
                presets: ['@babel/env']
            }))
            .pipe(concat('scripts.js'))
            .pipe(uglify())
            .pipe(rename({ suffix: '.min'})) //scripts.min.js
            .pipe(gulp.dest('./dist/js'))

    return callback()
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
                concurrent: 10,
                quiet: true
            }))
            .pipe(gulp.dest('./dist/images'))

}

function tarefasHTML(callback){

    gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'))

        return callback()
}

gulp.task('server', function(){

    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
    gulp.watch('./src/**/*').on('change', process)
    gulp.watch('./src/**/*').on('change', reload)
})

const process = series ( tarefasCSS, tarefasJS, tarefasHTML)


exports.default = process
exports.styles = tarefasCSS
exports.scripts = tarefasJS
exports.images = tarefasImagem