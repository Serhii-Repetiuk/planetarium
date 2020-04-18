
const stylus = require('gulp-stylus');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const del = require('del');
const svgstore = require('gulp-svgstore');

gulp.task('css', () => gulp
  .src('source/styl/style.styl')
  .pipe(sourcemap.init())
  .pipe(stylus())
  .pipe(postcss([
    autoprefixer(),
  ]))
  .pipe(sourcemap.write('.'))
  .pipe(gulp.dest('build/css'))
  .pipe(server.stream()));

gulp.task('min', () => gulp
  .src('source/styl/style.styl')
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(stylus())
  .pipe(postcss([
    autoprefixer(),
  ]))
  .pipe(csso())
  .pipe(rename('style.min.css'))
  .pipe(sourcemap.write('.'))
  .pipe(gulp.dest('build/css'))
  .pipe(server.stream()));

gulp.task('copy', () => gulp
  .src([
    'source/fonts/**/*.{woff,woff2}',
    'source/img/**',
    'source/js/**',
    'source/*.ico',
    'source/*.html',
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

gulp.task('cleanLogos', () => del('build/img/logo-*.svg'));

gulp.task('clean', () => del('build'));

gulp.task('html', () => gulp
  .src('source/*.html')
  .pipe(gulp.dest('build/')));

gulp.task('refresh', (done) => {
  server.reload();
  done();
});

gulp.task('server', () => server.init({
  server: 'build/',
  notify: false,
  open: true,
  cors: true,
  ui: false,
}));

gulp.watch('source/styl/**/*.styl', gulp.series('css', 'min'));
gulp.watch('source/*.html', gulp.series('html', 'refresh'));

gulp.task('build', gulp.series(
  'clean',
  'copy',
  'sprite',
  'cleanLogos',
  'css',
  'min',
));

gulp.task('start', gulp.series('build', 'server'));
