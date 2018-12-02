/*
 * @Author: Zhen 
 * @Date: 2018-12-01 10:02:42 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-02 11:37:07
 */
let gulp = require("gulp");
let sass = require("gulp-sass");
let minScss = require("gulp-clean-css");
let server = require("gulp-webserver");
let url = require("url");
let path = require("path");
let fs = require("fs");
let list = require("./src/mock/swiper.json");
let data = require("./src/mock/list.json")
console.log(data)

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
                    if (pathname == "/api/list") {
                        res.end(JSON.stringify({ "code": 0, data: list }))
                    } else if (pathname == "/api/data") {
                        res.end(JSON.stringify({ "code": 0, datas: data }))
                    } else {
                        pathname = pathname == "/" ? "index.html" : pathname;
                        res.end(fs.readFileSync(path.join(__dirname, "src", pathname)))
                    }
                }
            }))
    })
    //开发环境
gulp.task("dev", gulp.series("devScss", "devServer", "watch"))