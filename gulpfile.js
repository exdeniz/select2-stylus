// Инициализируем плагины
var gulp = require('gulp'), // Сообственно Gulp JS
    jade = require('gulp-jade'), // Плагин для Jade
    stylus = require('gulp-stylus'), // Плагин для Stylus
    csso = require('gulp-csso'), // Минификация CSS
    imagemin = require('gulp-imagemin'), // Минификация изображений
    uglify = require('gulp-uglify'), // Минификация JS
    concat = require('gulp-concat'), // Склейка файлов
    plumber = require('gulp-plumber'),
    newer = require('gulp-newer'),
    browserSync = require('browser-sync'),
    pixrem = require('gulp-pixrem'),
    rename = require("gulp-rename"),
    prefix = require('gulp-autoprefixer');


// Собираем Stylus
gulp.task('stylus', function() {
    gulp.src('./assets/b/blocks.styl')
    .pipe(plumber())
    .pipe(stylus()) // собираем stylus
    .pipe(prefix())
    .pipe(gulp.dest('./public/css/')) // записываем css
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('stylusURI', function() {
    gulp.src('./assets/b/blocks.uri.styl')
    .pipe(plumber())
    .pipe(stylus()) // собираем stylus
    .pipe(prefix())
    .pipe(gulp.dest('./public/css/')) // записываем css
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('stylusIE', function() {
    gulp.src('./assets/b/blocks.ie.styl')
    .pipe(plumber())
    .pipe(stylus()) // собираем stylus
    .pipe(prefix())
    .pipe(gulp.dest('./public/css/')) // записываем css
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('stylusREM', function() {
    gulp.src('./assets/b/blocks.styl')
    .pipe(plumber())
    .pipe(stylus()) // собираем stylus
    .pipe(prefix("ie 8"))
    .pipe(pixrem('62.5%',{replace: true}))
    .pipe(rename('blockIE8.css'))
    .pipe(gulp.dest('./public/css/')) // записываем css
    .pipe(browserSync.reload({stream:true}))
});

// Build CSS Select
gulp.task('buildSelect2', function() {
    gulp.src('./assets/b/ui/select2/select2.styl')
    .pipe(plumber())
    .pipe(stylus()) // собираем stylus
    .pipe(prefix())
    .pipe(rename('select2.css'))
    .pipe(gulp.dest('./build/')) // записываем css
    .pipe(rename('select2.min.css'))
    .pipe(csso())
    .pipe(gulp.dest('./build/'))
});

// Собираем html из Jade

gulp.task('jade', function() {
    gulp.src(['./assets/template/*.jade', '!./assets/template/_*.jade'])
        .pipe(jade({
            pretty: true
        }))  // Собираем Jade только в папке ./assets/template/ исключая файлы с _*
        .on('error', console.log) // Если есть ошибки, выводим и продолжаем
    .pipe(gulp.dest('./public/')) // Записываем собранные файлы
    .pipe(browserSync.reload({stream:true}))
});



// Собираем JS
gulp.task('js', function() {
    gulp.src(['./assets/js/index/**/*.js', './assets/js/plugins.js'])
        .pipe(concat('index.js')) // Собираем все JS, кроме тех которые находятся в ./assets/js/vendor/**
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.reload({stream:true,once: true}))
});
gulp.task('bower-js', function() {
    gulp.src([
        './assets/bower_components/jquery/dist/jquery.js',
        '/assets/bower_components/switchery/switchery.js'
        ])
        .pipe(gulp.dest('./assets/js/vendor/'))
        .pipe(browserSync.reload({stream:true,once: true}))
});

gulp.task('vendor-js', function() {
    gulp.src(['./assets/js/vendor/**/*.js'])
        .pipe(concat('vendor.js')) // Собираем все JS, кроме тех которые находятся в ./assets/js/vendor/**
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.reload({stream:true,once: true}))
});


// Копируем и минимизируем изображения

gulp.task('images', function() {
    gulp.src('./assets/img/**/*')
        .pipe(newer('./public/img'))
        .pipe(imagemin())
        .pipe(gulp.dest('./public/img'))
        .pipe(browserSync.reload({stream:true,once: true}))

});

gulp.task('favicon', function() {
    gulp.src(['./assets/favicon/**/*.png','./assets/favicon/**/*.ico'])
        .pipe(newer('./public/'))
        .pipe(gulp.dest('./public/'))
        .pipe(browserSync.reload({stream:true,once: true}))

});

gulp.task('fonts', function() {
    gulp.src('./assets/fonts/**/*')
        .pipe(newer('./public/fonts'))
        .pipe(gulp.dest('./public/fonts'))
        .pipe(browserSync.reload({stream:true,once: true}))

});



gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "./public/",
        }

    });
});
// Запуск сервера разработки gulp watch
gulp.task('default', function() {
    // // Предварительная сборка проекта
    gulp.run(['stylus','stylusIE','stylusURI']);
    gulp.run('jade');
    gulp.run('images');
    gulp.run('favicon');
    gulp.run('vendor-js');
    gulp.run('js');
    gulp.run('fonts');
    gulp.run('browser-sync');


    gulp.watch(['assets/b/**/*.styl','!assets/b/**/*.ie.styl','!assets/b/**/*.uri.styl'] , function() {
        gulp.run('stylus');
    });
    gulp.watch('./assets/b/ui/select2/**/*.styl' , function() {
        gulp.run('buildSelect2');
    });
    gulp.watch(['!assets/b/**/*.styl','assets/b/**/*.ie.styl','!assets/b/**/*.uri.styl'] , function() {
        gulp.run('stylusIE');
    });
    gulp.watch(['!assets/b/**/*.styl','!assets/b/**/*.ie.styl','assets/b/**/*.uri.styl'] , function() {
        gulp.run('stylusURI');
    });
    gulp.watch(['assets/template/**/*.jade','assets/b/**/*.jade'], function() {
        gulp.run('jade');
    });
    gulp.watch('assets/img/**/*', function() {
        gulp.run('images');
    });
     gulp.watch('assets/favicon/**/*', function() {
        gulp.run('favicon');
    });
    gulp.watch('assets/js/**/*', function() {
        gulp.run('js');
        gulp.run('vendor-js');
    });
    gulp.watch('assets/fonts/**/*', function() {
        gulp.run('fonts');
    });
    gulp.watch('assets/icons/**/*', function() {
       gulp.run('iconfont');
    });
});

gulp.task('build', function() {

    // css
    gulp.src(['./assets/b/blocks.styl', './assets/b/blocks.ie.styl', './assets/b/blocks.uri.styl'])
        .pipe(stylus()) // собираем stylus
        .pipe(prefix())
        .pipe(csso()) // минимизируем css
        .pipe(gulp.dest('./build/css/')) // записываем css


    // jade
    gulp.src(['./assets/template/*.jade', '!./assets/template/_*.jade'])
        .pipe(jade())
        .pipe(gulp.dest('./build/'))

    gulp.src(['./assets/js/index/**/*.js', './assets/js/plugins.js'])
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'))

    gulp.src(['./assets/js/vendor/**/*.js'])
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));// js

    // image
    gulp.src('./assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'))
    // favicon
    gulp.src(['./assets/favicon/**/*.png','./assets/favicon/**/*.ico'])
        .pipe(gulp.dest('./build/'))

    // fonts
    gulp.src('./assets/fonts/**/*')
        .pipe(gulp.dest('./build/fonts'))
});

