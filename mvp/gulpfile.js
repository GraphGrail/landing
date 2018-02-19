'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var jpegtran = require('imagemin-jpegtran');
//var pngquant = require('imagemin-pngquant');
var pug = require('gulp-pug');
var browserSync = require("browser-sync");
var changed = require('gulp-changed');
var wget = require('wget');
var options = require('minimist')(process.argv.slice(3));
var fs = require('fs');
var rename = require("gulp-rename");
var shell = require('gulp-shell');
var fontgen = require('gulp-fontgen');

var src_dir = 'src';
var dest_dir = 'dest';
var paths = {
    "src": {
        'views': src_dir + '/views',
        'fonts': src_dir + '/fonts',
        'styles': src_dir + '/styles',
        'images': src_dir + '/images',
        'scripts': src_dir + '/scripts'
    },
    "dest": {
        'views': dest_dir + '/views',
        'fonts': dest_dir + '/fonts',
        'styles': dest_dir + '/styles',
        'images': dest_dir + '/images',
        'scripts': dest_dir + '/scripts'
    }
};

var host = 'localhost';

gulp.task('livereload', function (cb) {
    var bs = browserSync.init({server: false}, function (a, b) {
        var code = '<script id="__bs_script__">//<![CDATA[\n    document.write("<script async src=\'http://HOST:PORTPATH\'><\\/script>".replace("HOST", location.hostname));\n//]]></script>'
            .replace('PORT', b.options.get('port'))
            .replace('PATH', b.options.get('scriptPaths').get('versioned'));

        fs.writeFile(paths.src.views + '/livereload.html', code, function () {
            cb();
        });
    })
});

gulp.task('views', function () {
    return gulp.src([paths.src.views + '/**/*.pug', '!/**/_*', '!/inc/'])
        .pipe(pug({
            pretty: true
        }))
        .pipe(rename(function (path) {
            path.extname = ".html"
        }))
        .pipe(gulp.dest(paths.dest.views));

});

gulp.task('styles', function () {
    return gulp.src(paths.src.styles + '/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dest.styles))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('scripts', function () {
    return gulp.src(paths.src.scripts + '/**/*.js')
        .pipe(gulp.dest(paths.dest.scripts));
});

gulp.task('fonts', function () {
    return gulp.src(paths.src.fonts + "/**/*.{dfont,ttc,ttf,otf}")
        .pipe(fontgen({
            dest: paths.dest.fonts
        }));
});

gulp.task('images', function () {
    return gulp.src(paths.src.images + '/*')
        .pipe(changed(paths.dest.images))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(paths.dest.images));
});

gulp.task('force-images', function () {
    return gulp.src(paths.src.images + '/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(paths.dest.images));
});

gulp.task('default', ['views','styles','scripts','fonts','images']);

gulp.task('views-live', ['views'], browserSync.reload);
gulp.task('fonts-live', ['fonts'], browserSync.reload);
gulp.task('scripts-live', ['scripts'], browserSync.reload);
gulp.task('images-live', ['images'], browserSync.reload);
gulp.task('styles-live', ['styles']);

gulp.task('live', ['livereload', 'default'], function () {
    for(let w of ['views','styles','scripts','fonts','images']){
        gulp.watch([paths.src[w] + '/**/*'], [w+'-live']);
    }
});

gulp.task('updatelive', function () {
    console.log(Date.now(), 'updatelive');
    browserSync.reload();
});

// gulp lorempixel --name="test/img_$" --qty=3 --size='200x150'
gulp.task('lorempixel', function () {
    var name = options.name;
    var qty = options.qty;
    var size = options.size;
    var src = 'http://lorempixel.com/' + size.replace('x', '/') + '/';
    for (var i = 1; i <= qty; i++) {
        wget.download(src, path.src.images + '/' + name.replace('$', i) + '.jpg').on('error', function (err) {
            console.log(err);
        });
    }
});

gulp.task('install', shell.task([
    'mkdir -p ./' + paths.src.views,
    'mkdir -p ./' + paths.src.fonts,
    'mkdir -p ./' + paths.src.scripts,
    'mkdir -p ./' + paths.src.images,
    'mkdir -p ./' + paths.src.styles,
    'mkdir -p ./' + paths.dest.views,
    'mkdir -p ./' + paths.dest.fonts,
    'mkdir -p ./' + paths.dest.scripts,
    'mkdir -p ./' + paths.dest.images,
    'mkdir -p ./' + paths.dest.styles
]));