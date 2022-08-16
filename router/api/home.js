var express = require('express');
var router = express.Router();
const croud = require('../crud');
const {client} =require('./../../db/dbconnection')

var sleep = (ms)=>{
  return new Promise(resolve => setTimeout(resolve, ms));
}

// formatDate
const formatDateLib = async(date) => {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hour='' +d.getHours(),
      minute='' +d.getMinutes(),
      second='' +d.getSeconds();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;
  if (hour.length < 2) 
      hour = '0' + hour;
  if (minute.length < 2) 
      minute = '0' + minute;
  if (second.length < 2) 
      second = '0' + second;

  var str= [year, month, day].join('-');
  return str+" "+hour+":"+minute+":"+second;
}




router.get('/', function (req, res) {
    res.render('home', { title: 'Register page' });
    
  });

router.post('/signe',async(req,res)=>{
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    // var age = req.body.age;
    var email= req.body.email;
    var password= req.body.password;
    var repassword = req.body.repassword
    // var role = req.body.role;
    console.log(firstName)
    console.log(lastName)
    // console.log(age)
    console.log(email)
    console.log(password)
    console.log(repassword)
    // console.log(role)

    if(password == repassword){
  
      // var sql = `INSERT INTO users(firstname,lastnamme,emailid,passWord) value (${firstName},${lastName},${email},${password}) Retering userid ;`
      // this.connect.qury(sql);
      // var insert =  sqlcon.query(sql,(err,result)=>{
      //   if(err) throw err;

      //   console.log("1 recoed inserted")
      // })
      var filedArry = [{field:'firstname',value:firstName},{field:'lastname',value:lastName},{field:'emailid',value:email},{field:'passWord',value:password}]
      // console.log(sql)
      var userinsert = await  croud.executeQuery(croud.makeInsertQueryString('users',filedArry,['user_id'],false));
      // await sleep(2000);
      if(!userinsert.status){
        return{
          status:false,
          err:" sql error"
        }
      }
      console.log(userinsert.data);

      console.log(userinsert.data[0]['user_id']);
      console.log("---------")
      var userids = userinsert.data[0]['user_id'];
      console.log(userids);
      if(userinsert.data.length > 0){
        console.log(".....data finding....");
        res.render('login')

      }
      
      // console.log(userinsert)
      // req.setHeader("Content-Type", "text/html");

    }else{
      res.redirect('/');
    }

})

router.get('/loginpage', ( req,res,next)=>{
  res.render('login',{title: 'login Page'});
  next()
})

router.post('/log',async(req,res,next)=>{
  var email= req.body.email
  var password= req.body.password;
  console.log(email);
  console.log(password);
  var getdata = [];
 var sql=`Select * from users where emailid ='${email}' and  passWord = '${password}';`
 var check =await croud.executeQuery(sql);
 console.log('**** -___',check.data)
if(!check.status){
  return{
    status:false,
    err:"Sql err"
  }
}
if(check.data.length > 0){
  console.log("----+++++-----");
  // res.redirect('/mainpage')
   res.render('main',{userid:`${check.data[0]['user_id']}`, role:`${check.data[0]['role']}` ,data:`${check.data[0]['firstname']}  ${check.data[0]['lastname']}`})

}else{
  res.redirect('/loginpage')
}
 console.log("******",getdata)
//  var getUserdata1 = croud.executeQuery(sql)
//  console.log("------------",getUserdata);
//  console.log(getUserdata.data);
// if(getUserdata1.data.length >0 ){
//   res.redirect('/mainpage')

// }
//  res.render('login')

})


router.get('/mainpage',async(req,res)=>{

  var sql= `SELECT * FROM roles ORDER BY role_id ASC ;`;
  var getrolesdata =await croud.executeQuery(sql);
  if(!getrolesdata.status){
    return {
      status:false,
      err:" sql errr... "
    }
  }
  if(getrolesdata.data.length < 1){
    return res.redirect('/loginpage');
  }
  // for(var i=0;i<getrolesdata.data.length;i++){
  //   var rolename= getrolesdata.data[i].rolename;
  //   var access=getrolesdata.data[i].access;
  return getrolesdata.data;

  // }

})

router.post('/roleass',async(req,res,next)=>{
  var rolename = req.body.role;
  var userid= req.body.datas;
  console.log(rolename);
  console.log(userid)
  if(rolename == undefined){
    return{
      status:false,
      err:"invalied body pass"
    }
  }

  var sql =`Select * from users where user_id='${userid}';`
  var usercheck= await croud.executeQuery(sql);
  if(!usercheck.status){
    return{
      status:false,
      err:' sql errr...'
    }
  }
  var checkrole = await croud.executeQuery(`select * from roles where rolename='${rolename}';`);
  if(checkrole.data.length > 0){
    var access = checkrole.data[0]['access']
  }
  if(usercheck.data.length >0 ){
    var valuearr = [{field:'rolename',value:rolename},{field:'access',value:access}];
    var conditions =`user_id ='${userid}'`;
    var setrole = await croud.executeQuery(croud.makeUpdateQueryString('users',valuearr,conditions));
    var valuearr = [{field:"active",value:'true'}];
    var conditions =`role_id ='${checkrole.data[0]['role_id']}' and rolename ='${rolename}'`;
    var rolefalg = await croud.executeQuery(croud.makeUpdateQueryString('roles',valuearr,conditions));
    if(!setrole.status){
      return{
        status:false,
        err:' sql err...'
      }
    } 
    res.render('main',{role:`${rolename}`, userid:`${userid}` ,data:`${usercheck.data[0]['firstname']}  ${usercheck.data[0]['lastname']}`})


  }
});

router.post('/newroleadd',async(req,res,next)=>{
  var rolename= req.body.rolename;
  var access = req.body.access;
  console.log(rolename)
  console.log(access)
  if(rolename == undefined || access == undefined){
    return{
      status:false,
      err:'invalied perams pass!!!'
    }
  }
  var sql =`select * from roles where rolename= '${rolename}';`
  var checkrole = await croud.executeQuery(sql);
  console.log(checkrole.data);
  if(checkrole.data.length > 0){
    return res.render('roleadd',{ msg:'Already Exists rolename'})
    
  }
  const getTime = new Date();
  // var sql = `insert into roles ('rolename','access', "createdAt", 'active') value( ${rolename},${access},${new Date().getTime()},false))`;
  var valuearry = [{field:'rolename',value:rolename},{field:'access',value:access},{field:'createdat',value:await formatDateLib(getTime)},{field:'active',value:'false'}];
  var newaddrole = await croud.executeQuery(croud.makeInsertQueryString('roles',valuearry,['role_id'],false));
  console.log(newaddrole);
  console.log(newaddrole.data)
  console.log(newaddrole.data[0]['role_id']);
  res.render('roleadd',{msg:''+rolename+'  add success'})

})

router.get('/newaddrole',(req,res,next)=>{
  res.render('roleadd',{msg:''})
})
module.exports = router