var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');

    // Config
    var config = {
        theme: 'admin',
        public: 'public_html'
    }

    // Style Tasks
    gulp.task('styles', function() {
        return sass('src/style.scss', { style: 'expanded' })
        .pipe(plumber())
        .pipe(gulp.dest(''+ config.public +'/css'))
        .pipe(autoprefixer({cascade: false}))
        .pipe(minifycss())
        .pipe(gulp.dest(''+ config.public +'/css'))
        .pipe(notify({ message: 'Styles task complete' }));
    });

    // Housekeeping
    gulp.task('clean', function(cb) {
        del([''+ config.public +'/css'], cb)
    });

    // Default task
    gulp.task('default', ['clean'], function() {
        gulp.start('styles');
    });

    // Watch
    gulp.task('watch', function() {

        // Watch .scss files
        gulp.watch(['src/*.scss', 'src/**/*.scss', 'src/**/**/*.scss'], ['styles']);

    });
