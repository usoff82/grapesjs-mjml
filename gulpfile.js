const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
var handlebars = require('handlebars');

const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('hello', function (callback) {
    console.log("Hello");
    callback();
})


handlebars.registerHelper('even', function(val) {
    return val % 2 == 0
  });

gulp.task('handlebars', function () {
    return gulp.src('templates/**/*.{json,mjml}', { read: false, since: gulp.lastRun('handlebars') })
        .on('data', function (file) {
            console.log(`${file.dirname} ${file.basename}: ${file.stem} ${file.extname}`)
            try {
                pocessTemplate(file.stem);
            } catch (err) {
                //console.error(err);
            }
        })
})


gulp.task('server', shell.task('node server.js'));

gulp.task('watch', function () {
    const watcher = gulp.watch('templates/**/*.{json,mjml}', gulp.series('handlebars'));
});

gulp.task('default', gulp.parallel('server', 'watch'));


function pocessTemplate(filename) {
    const context = JSON.parse(fs.readFileSync(`./templates/${filename}.json`));
    let source = fs.readFileSync(`./templates/${filename}.mjml`).toString();
    let $ = cheerio.load(source);
    $('mj-image[src-alt]').each(function (i, el) {
        $(this).attr('src', $(this).attr('src-alt'));
        $(this).removeAttr('src-alt');
        return true;
    });
    $('*[id]').each(function (i, el) {
        $(this).removeAttr('id');
        return true;
    });
    source = $.html();
    let text = handlebars.compile(source)(context);//.replaceAll(/\<script\>\<\/script\>\n/gm, '');
    $ = cheerio.load(text);
    $('*[display=none]').remove();
    text = $.html().replace('<html><head></head><body>', '').replace('</body></html>', '');
    fs.writeFileSync(`./templates/${filename}.proc.mjml`, text);
    return text;
}