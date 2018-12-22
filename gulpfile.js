var gulp = require('gulp');
var sass = require('gulp-sass');

var input = './themes/ottanxyz/src/scss/**/*.scss';
var output = './themes/ottanxyz/static/styles';

// Compile scss into css
gulp.task('scss', function() {
  return gulp
    // Find all `.scss` files from the `stylesheets/` folder
    .src(input)
    // Run Sass on those files
    .pipe(sass())
    // Write the resulting CSS in the output folder
    .pipe(gulp.dest(output));
});

// Watch scss directory
gulp.task('watch', ['scss'], function() {
    gulp.watch('./themes/ottanxyz/src/scss/**/*', ['scss'])
});

// Set watch as default task
gulp.task('default', ['watch']);