const fs = require('fs');
const path = require('path');

const cheerio = require('cheerio');
var handlebars = require('handlebars');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

handlebars.registerHelper('even', function(val) {
  return val % 2 == 0
});

app.get("/", (req, res) => {
    res.send("Hello Express");
});

app.post("/save", function (req, res) {
    const filename = './templates/'+req.body.filename;
    fs.writeFileSync(filename, req.body.text);
/*    try {
      pocessTemplate(path.parse(req.body.filename).name);
    } catch (err) {
      console.error(err);
    }*/
    fs.writeFileSync('./templates/'+path.parse(filename).name+'.project.json', JSON.stringify(req.body.projectdata, null, 2));
    res.send('{"status": "OK" }');
});

app.post("/load", function (req, res) {
    const filename = './templates/'+req.body.filename;
    let text = fs.readFileSync(filename).toString();
    res.send(JSON.stringify({filename: req.body.filename, text}, null, 2));
});

app.post("/proc", function (req, res) {
  const filename = path.parse(req.body.filename).name;
  const text = pocessTemplate(filename);
  res.send(JSON.stringify({filename: `${filename}.proc.mjml`, text}, null, 2));
});

var port = process.env.PORT || 3603;
app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);

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