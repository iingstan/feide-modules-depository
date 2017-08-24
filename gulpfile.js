let gulp = require('gulp')
let zip = require('gulp-zip')

gulp.task('default', function() {
  gulp.src([
    './{dev,lib,models,public,routes,views}/**/*.*',
    './app.js'
  ])
  .pipe(zip('publish.zip'))
  .pipe(gulp.dest('./'))
})