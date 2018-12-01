/*
 * @Author: Zhen 
 * @Date: 2018-12-01 10:02:42 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-01 10:26:39
 */
let gulp = require("gulp");
let sass = require("gulp-sass");
let minScss = require("gulp-clean-css");
let server = require("gulp-webserver");
let url = require("url");
let path = require("path");
let fs = require("fs");

//编译scss
gulp.task("devScss", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(minScss())
        .pipe(gulp.dest("./src/css"))
})

//监听scss
gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("devScss"))
})

//起服务
gulp.task("devServer", function() {
        return gulp.src("src")
            .pipe(server({
                port: 9009,
                middleware: function(req, res, next) {
                    let pathname = url.parse(req.url).pathname;

                    if (pathname == "/favicon.ico") {
                        res.end("")
                        return
                    }
                    pathname = pathname == "/" ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                }
            }))
    })
    //开发环境
gulp.task("dev", gulp.series("devScss", "devServer", "watch"))