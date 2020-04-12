"use strict";

// include the required packages.
let stylus = require('gulp-stylus');

let gulp = require("gulp");
let plumber = require("gulp-plumber");
let sourcemap = require("gulp-sourcemaps");
let postcss = require("gulp-postcss");
let autoprefixer = require("autoprefixer");
let server = require("browser-sync").create();
let csso = require("gulp-csso");
let rename = require("gulp-rename");
let del = require("del");
let svgstore = require("gulp-svgstore");

gulp.task("css", function () {
    return gulp.src("source/styl/style.styl")
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(stylus())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(sourcemap.write("."))
        .pipe(gulp.dest("build/css"))
        .pipe(server.stream());
});

gulp.task("min", function () {
    return gulp.src("source/styl/style.styl")
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(stylus())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(csso())
        .pipe(rename("style.min.css"))
        .pipe(sourcemap.write("."))
        .pipe(gulp.dest("build/css"))
        .pipe(server.stream());
});

gulp.task("copy", function () {
    return gulp.src([
        "source/fonts/**/*.{woff,woff2}",
        "source/img/**",
        "source/js/**",
        "source/*.ico",
        "source/*.html"
    ], {
        base: "source"
    })
        .pipe(gulp.dest("build"));
});

gulp.task("sprite", function() {
    return gulp.src("build/img/logo-*.svg")
        .pipe(svgstore({
            inLineSvg: true
        }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("build/img"));
});

gulp.task("cleanLogos", function() {
    return del("build/img/logo-*.svg")
});

gulp.task("clean", function () {
    return del("build");
});

gulp.task("html", function () {
    return gulp.src("source/*.html")
        .pipe(gulp.dest("build/"));
});

gulp.task("refresh", function (done) {
    server.reload();
    done();
});

gulp.task("server", function () {
    server.init({
        server: "build/",
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch("source/styl/**/*.{styl}", gulp.series("css", "min"));
    gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("build", gulp.series(
    "clean",
    "copy",
    "sprite",
    "cleanLogos",
    "css",
    "min"
));

gulp.task("start", gulp.series("build", "server"));
