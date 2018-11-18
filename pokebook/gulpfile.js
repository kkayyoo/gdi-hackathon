var gulp          = require('gulp');
var browserSync   = require('browser-sync').create();
var $             = require('gulp-load-plugins')();
var autoprefixer  = require('autoprefixer');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');

var paths = {
  sassPaths : ['node_modules/foundation-sites/scss','node_modules/motion-ui/src'],
};

function sass() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: paths.sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.postcss([
      autoprefixer({ browsers: ['last 2 versions', 'ie >= 9'] })
    ]))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
};

function serve() {
  browserSync.init({
    server: "./"
  });

  gulp.watch("scss/*.scss", sass);
  gulp.watch("*.html").on('change', browserSync.reload);
}

function optimizeImage() {
  var imgSrc = './images/*.+(png|jpg|gif)',
  imgDst = './dist/images';
  return gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
}

function scripts() {
  return gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
};

function clean() {
  return gulp.src(paths.sassPaths)
      .pipe( clean() )
      .pipe( notify( { message: 'Clean task complete.' } ) )
};

gulp.task('sass', sass);
gulp.task('scripts', scripts);
gulp.task('optimizeImage', optimizeImage);
gulp.task('clean', clean);
gulp.task('serve', gulp.series('sass', serve));
gulp.task('default', gulp.series('sass', 'scripts'));

