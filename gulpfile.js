var gulp = require("gulp");
var less = require("gulp-less");
var shell = require("gulp-shell");
var runSequence = require("run-sequence");

gulp.task("less", function(){
    gulp.src("./app/less/app.less")
    .pipe(less())
    .pipe(gulp.dest("./styles/"));
});

gulp.task("less-watch", function(){
    gulp.watch(["./app/**/*.less"],["less"]);
})