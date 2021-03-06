
const gulp = require('gulp');
const stylus = require('gulp-stylus');
const plumber = require('gulp-plumber');
// const sourcemap = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const del = require('del');
const svgstore = require('gulp-svgstore');
const babel = require('gulp-babel');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');

gulp.task('css', () => gulp
  .src('source/styl/style.styl')
  // .pipe(sourcemap.init())
  .pipe(stylus())
  .pipe(postcss([
    autoprefixer(),
  ]))
  // .pipe(sourcemap.write('.'))
  .pipe(gulp.dest('build/css'))
  .pipe(server.stream()));

gulp.task('js', () => gulp
  .src('source/js/**/*.js')
  .pipe(babel({ presets: ['@babel/preset-env'] }))
  .pipe(gulp.dest('build/js'))
  .pipe(server.stream()));

gulp.task('min', () => gulp
  .src('source/styl/style.styl')
  .pipe(plumber())
  // .pipe(sourcemap.init())
  .pipe(stylus())
  .pipe(postcss([
    autoprefixer(),
  ]))
  .pipe(csso())
  .pipe(rename('style.min.css'))
  // .pipe(sourcemap.write('.'))
  .pipe(gulp.dest('build/css'))
  .pipe(server.stream()));

gulp.task('copy', () => gulp
  .src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source/js**/*.js',
    'source/*.ico',
    'source/*.html',
    'source/*.css',
  ], {
    base: 'source',
  })
  .pipe(gulp.dest('build')));

gulp.task('sprite', () => gulp
  .src('build/img/logo-*.svg')
  .pipe(svgstore({
    inLineSvg: true,
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img')));

gulp.task('posthtml', () => gulp
  .src('source/*.html')
  .pipe(posthtml([
    include()
  ]))
  .pipe(gulp.dest('build/')));

gulp.task('cleanLogos', () => del('build/img/logo-*.svg'));

gulp.task('clean', () => del('build'));

gulp.task('html', () => gulp
  .src('source/index.html')
  .pipe(gulp.dest('build/')));

gulp.task('refresh', (done) => {
  server.reload();
  done();
});

gulp.task('server', function() {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });
  gulp.watch('source/styl/**/*.styl', gulp.series('css', 'min'));
  gulp.watch('source/*.html', gulp.series('html', 'refresh'));
  gulp.watch('source/js/**/*.js', gulp.series('js', 'refresh'));
});

gulp.task('build', gulp.series(
  'clean',
  'copy',
  'html',
  'posthtml',
  'sprite',
  'cleanLogos',
  'js',
  'css',
  'min',
));

gulp.task('start', gulp.series('build', 'server'));
