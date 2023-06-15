// Подключение модулей

const gulp = require('gulp');
const less = require('gulp-less');
const del = require('del');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat')

// 
const paths = {
    styles: {
        src: 'src/styles/**/*.less',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    }
}

// Очиска файла dist

function clear() {
    return del(['dist'])
}

// скрипт для работы с js кодом

function scripts() {
    return gulp.src(paths.scripts.src, {
        sourcemaps: true
    })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
}


// скрипт для работы со стилями(подключение less, очищещение файла, минификация кода)

function styles() {
    return gulp.src(paths.styles.src)
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(rename({
        basename: 'main', 
        suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest))
}

// Отслеживаение изменений в коде

function watch()  {
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, scripts)
}

//Поочередное выполение задач(очистка файла dist, подключение less отслеживаение изменений в файле less)

const build = gulp.series(clear, gulp.parallel(styles, scripts), watch)


exports.clear = clear
exports.styles = styles
exports.watch = watch
exports.build = build
exports.default = build
exports.scripts = scripts