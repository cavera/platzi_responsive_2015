var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    minifyCSS = require('gulp-minify-css'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    smoosher = require('gulp-smoosher'),
    imageop = require('gulp-image-optimization');

var config = {
    styles: {
        main: './src/styles/main.styl',
        watch: './src/styles/**/*.styl',
        output: 'build/css'
    },
    html: {
        watch: './src/*.html'
    },
    scripts: {
        main: './src/scripts/main.js',
        watch: './src/scripts/**/*.js',
        output: './build/js'
    },
    images: {
        watch: ['./build/img/*.png', './build/img/*.jpg'],
        output: './dist/img'
    }
}

gulp.task('server', function() {
    gulp.src('./build')
        .pipe(webserver({
            host: '0.0.0.0',
            port: 8080,
            livereload: true
        }))
});

gulp.task('build:css', function() {
    gulp.src(config.styles.main)
        .pipe(stylus({
            use: [nib()],
            'include css': true
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest(config.styles.output));
});

gulp.task('build:js', function() {
    return browserify(config.scripts.main)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(config.scripts.output));
});

gulp.task('watch', function() {
    gulp.watch(config.images.watch, ['images']);
    gulp.watch(config.scripts.watch, ['build:js']);
    gulp.watch(config.styles.watch, ['build:css']);
    gulp.watch(config.html.watch, ['build']);
});

gulp.task('images', function() {
    gulp.src(config.images.watch)
        .pipe(imageop({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(config.images.output))
});

gulp.task('inline', function() {
    gulp.src('./build/index.html')
        .pipe(smoosher())
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['build:css', 'build:js', 'images', 'inline']);
gulp.task('default', ['server', 'watch', 'build']);
