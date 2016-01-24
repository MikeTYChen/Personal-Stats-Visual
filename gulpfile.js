var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var ejs = require('gulp-ejs');
var browserSync = require('browser-sync');
var fs = require("fs");
var reload = browserSync.reload;

var paths = {
    sass:['./app/scss/**/*.scss','!./app/scss/**/_*.scss'],
    sassInput:['./app/scss/**/*.scss'],
    ejs:['./app/views/**/*.ejs','!./app/views/**/_*.ejs'],
    ejsInput:['./app/views/**/*.ejs'],
    js:['./app/js/**/*.js','!./app/js/**/_*.js'],
    workout:["./data/workouts.txt"]
}

gulp.task('updateData', function() {
    var fileContent=fs.readFileSync("./data/workouts.txt", "utf8").toString();
    var result =[];
    var count=0;
    var days = fileContent.split('\n');
    var date = new Date();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    var currentDate = month+"-"+day+"-"+date.getFullYear();
    result.push({lastUpdate:currentDate});
    var elliptical = 0;
    var cycling = 0;
    var running = 0;
    var rest = 0;
    for(var num in days){
        var data = days[num].split('|');
        var miles = data[0].split(' ')[0];
        var minutes = data[2].split(' ')[0];
        if(data[1]=="Elliptical"){
            elliptical++;
        }else if(data[1]=="Cycling"){
            cycling++;
        }else if(data[1]=="Run"){
            running++;
        }else if(data[1]=="None"){
            rest++;
        }
        result.push({mile:miles,type:data[1],time:minutes,date:data[3]});
    }

    result[1] ={elliptical:elliptical,cycling:cycling,running:running,rest:rest};
    fs.writeFile('./public/data/data.json',JSON.stringify(result),function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to data.json");
    }});
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src(paths.sass)
        .pipe(sass())
        .on('error',sass.logError)
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('public/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss()) 
        .pipe(gulp.dest('public/css'));
});

// Compile Our EJS
gulp.task('ejs', function() {
    return gulp.src(paths.ejs)
        .pipe(ejs({msg:"Gulping EJS"}))
        .on('error',gutil.log)
        .pipe(gulp.dest('public/'));
});

//Compile JS files
gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('./public/js'));
});


//BrowserSync
gulp.task('browser-sync', function() {
    browserSync.init(["../css/*.css", "../js/*.js"],{
        server: {
            baseDir: "./public"
        },
        port: 3000
    });
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch([paths.sassInput], ['sass',reload]);
    gulp.watch([paths.ejsInput], ['ejs',reload]);
    gulp.watch([paths.js], ['js',reload]);
});


// Default Task ['sass', 'ejs', 'js', 'watch','browser-sync']
gulp.task('default', ['sass', 'ejs', 'js', 'watch','browser-sync','updateData']);