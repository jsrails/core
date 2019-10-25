var gulp = require('gulp');
var glob = require('glob');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var concatCss = require('gulp-concat-css');
var replace = require('gulp-replace');
var csso = require('gulp-csso');
var clean = require('gulp-clean');
//var config = require('../config/config');
//var src = require('../config/src');
var helper = require('./helper');

var builder = {
    firstCharExp: /^([\s\S]{1})/g,
    buildScript: function (sourceMap, targetDest, targetFileName, isMinify) {
        var listFilesDocBlockRails = helper.renderIncludedList(sourceMap);
        var gulp1 = gulp.src(sourceMap, { sourcemaps: true })
            .pipe(concat(targetFileName))
            .pipe(replace(this.firstCharExp, listFilesDocBlockRails + '\n\n$1'));
        if(isMinify === true) {
            gulp1 = gulp1.pipe(minify());
        }
        gulp1.pipe(gulp.dest(targetDest));
    },
    buildStyle: function (sourceMap, targetDest, targetFileName, isMinify) {
        var listFilesDocBlockStyle = helper.renderIncludedList(sourceMap);
        var gulp1 = gulp.src(sourceMap)
            .pipe(concatCss(targetFileName))
            .pipe(replace(this.firstCharExp, listFilesDocBlockStyle + '\n\n$1'));
        if(isMinify === true) {
            gulp1 = gulp1
                .pipe(csso())
                .pipe(minify());
        }
        gulp1.pipe(gulp.dest(targetDest));
    },
    buildPage: function (scriptList, styleList, targetDest) {
        scriptList = helper.replaceInArray(scriptList, './', '/');
        styleList = helper.replaceInArray(styleList, './', '/');
        var code = helper.generateScriptTags(scriptList);
        var style = helper.generateStyleTags(styleList);
        gulp.src(['./src/index.html'])
            .pipe(replace('<!--SCRIPT_PLACEHOLDER-->', code))
            .pipe(replace('<!--STYLE_PLACEHOLDER-->', style))
            .pipe(gulp.dest(targetDest));
    },
};

module.exports = builder;