const express = require('express');
const path = require('path');
var morgan = require('morgan');
const router = require("express").Router();
var expressLayouts = require('express-ejs-layouts');
var methodOverride = require('method-override')
var Message=require('js-message');
const app = express();
const session = require('express-session');
const { flash } = require('express-flash-message');
// express-session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      // secure: true, // becareful set this option, check here: https://www.npmjs.com/package/express-session#cookiesecure. In local, if you set this to true, you won't receive flash as you are using `http` in local, but http is not secure
    },
  })
);
// apply express-flash-message middleware
app.use(flash({ sessionKeyName: 'flashMessage' }));
app.use(require('connect-flash')());
// parsing body request
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
const port = 3000;
app.set('view options', { layout: false });
const route = require('../src/routes');
// layout express
app.use(expressLayouts);
app.use(express.static(path.join(__dirname+'/public')));
//  cấu hình đường dẫn đến views
app.set('view engine','ejs');
app.set('views' ,path.join(__dirname,'./resource/views/'));
// app.set('views' ,path.join(__dirname,'./resource/views/'));
// flash message

route(app);
// 

// 
app.use(morgan('combined'))
app.get('/abc', (req, res) => {
  // res.send(path.join(__dirname+'/resource/public'))
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});