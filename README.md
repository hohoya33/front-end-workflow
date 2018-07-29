#Front-End Workflow

https://github.com/adamrasheed/freelancejump

1. gulp
2. webpack + babel
3. sass
4. browser-sync

```bash
$ mkdir front-end-workflow
$ cd front-end-workflow
$ npm init
$ npm i gulp gulp-sass gulp-autoprefixer webpack-stream browser-sync babel-core babel-loader babel-preset-es2015 --save-dev
```

## 디렉터리 구조
```bash
[front-end-workflow]
├── node_modules
├── public
│   ├──assets
│   │	├── css
│   │	└── js
│   └── index.html
├── resource
│   └── assets
│   	├── css
│   	└── js
├── package.json
├── gulpfile.js
└── webpack.config.js
```


```js
//------ gulpfile.js ------
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const webpack = require('webpack-stream');

gulp.task('sass', function() {
    return gulp.src('./resource/assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('script', function() {
    return gulp.src('./resource/assets/js/app.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./public/assets/js'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './public/'
        }
    });
});

gulp.watch("./resource/assets/sass/**/*.scss", ["sass"]);
gulp.watch("./resource/assets/js/**/*.js", ["script"]);

gulp.watch("./public/assets/css/**/*.css").on("change", browserSync.reload);
gulp.watch("./public/assets/js/app.js").on("change", browserSync.reload);
gulp.watch("./public/*.html").on("change", browserSync.reload);

```

```js
//------ webpack.config.js ------
module.exports = {
    entry: {
        app: './resource/assets/js/app.js'
    },
    output: {
        path: __dirname + '/public/assets/js/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    }
}
```












