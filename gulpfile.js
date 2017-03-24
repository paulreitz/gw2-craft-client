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
});

gulp.task("build-less", function() {
    gulp.src("./app/less/app.less")
    .pipe(less())
    .pipe(gulp.dest("./dist/styles/"));
});

gulp.task("build-scripts", shell.task(["r.js.cmd -o build.js"]));
gulp.task("build-jade", shell.task(["jade index.jade -O \"{'environment':'prod'}\" -o \"./dist/\""]));

gulp.task("build-all", function(cb) {
    runSequence(["build-scripts", "build-jade", "build-less"]);
})