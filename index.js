const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const cookieparser =require('cookie-parser');
const prot =3000;
const app = express();
const home = require('./router/api/home');
const apiindex = require('./router/index')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieparser());
app.use(session({
    secret : 'ABCDefg',
    resave : false,
    saveUninitialized : true
}));

app.use(function(req, res, next) {
    // res.header('Access-Control-Allow-Origin', "http://cbadmin.dev.cb-compliancebrain.io");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, withCredentials');
    next();
  });


// view engine setup
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs')


app.use('/',home)
// app.use('/',apiindex)
app.use('/userlist',apiindex)
app.get('/',(req,res)=>{
    res.send('hello world')
})

app.listen(prot, (err)=>{
    if(err) throw err;

    console.log(` Server is starteing AT ${prot}`)
})



module.exports = app