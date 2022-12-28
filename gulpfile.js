
const { series, parallel } = require('gulp')
const gulp = require ('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const sass = require('gulp-sass')(require('node-sass'))
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const images = require('gulp-image')
const stripCss = require('gulp-strip-css-comments')
const htmlmin = require('gulp-htmlmin')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload


function tarefasCSS(callback) {

    gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.css',
                    './vendor/owl/css/owl.carousel.css',
                    './vendor/fontawesome/fontawesome.css',
                ])

            .pipe(stripCss()) //reover comentários no css
            .pipe(concat('libs.css'))
            .pipe(cssmin())
            .pipe(rename({ suffix: '.min'})) //libs.min.css
            .pipe(gulp.dest('./dist/css'))

    return callback()
}

function tarefasSASS ( callback) {
    
    gulp.src('./src/scss/**/*.scss')
    .pipe(sass()) // transforma o scss para css
    .pipe(gulp.dest('./dist/css'))

    return callback()
}

function tarefasFontawesome(callback) {

    gulp.src('./vendor/fontawesome/fontawesome.css')
    .pipe(stripCss()) //reover comentários no css
    .pipe(concat('fontawesome.css'))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min'})) //styles.min.css
    .pipe(gulp.dest('./dist/fontawesome'))

    return callback()

}

function tarefasFonts(callback) {

    gulp.src('./vendor/fonts/*')
        .pipe(images({
            pngquant: true,
            optLipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            concurrent: 10,
            svgo: true,
            quiet: true
        }))
        .pipe(gulp.dest('./dist/fonts'))

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
            .pipe(rename({ suffix: '.min'}))
            .pipe(gulp.dest('./dist/js'))

    return callback()
}

function tarefasImagem(callback) {

   gulp.src('./src/images/*')

            .pipe(images({
                pngquant: true,
                optLipng: false,
                zopflipng: true,
                jpegRecompress: false,
                mozjpeg: true,
                gifsicle: true,
                concurrent: 10,
                svgo: true,
                quiet: true
            }))
            .pipe(gulp.dest('./dist/images'))

        return callback()

}

function tarefasHTML(callback){

    gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'))

        return callback()
}

gulp.task('serve', function(){

    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
    gulp.watch('./src/**/*').on('change', process)
    gulp.watch('./src/**/*').on('change', reload)
})

function end(cb){

    console.log("tarefas concluídas")
    return cb()
}

const process = series ( tarefasCSS,tarefasSASS, tarefasJS, tarefasImagem, tarefasHTML,tarefasFontawesome, tarefasFonts, end)


exports.default = process
exports.styles = tarefasCSS
exports.scripts = tarefasJS
exports.images = tarefasImagem
exports.sass = tarefasSASS