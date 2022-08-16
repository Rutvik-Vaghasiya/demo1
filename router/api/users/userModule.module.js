const router = require('express').Router();
const croud = require('../../crud')

const sqlcon = require('./../../../db/dbconnection')

const getuserlistModule = async (req)=>{
    var  objreturn =[];
    var sql =`SELECT rolename ,access from roles where active ='true'`;
    // sqlcon.qury(sql,function(err,res){
    //     if(err) throw err

    //     console.log(res)
    //     return res.send(res);
    // });

    var getuserlistdata = croud.executeQuery(sql);
    if(getuserlistdata < 1){
        return{
            status:false,
            err:"Data Not Founed"
        }
    }
    for(i=0;i<getuserlistdata.data.length;i++){
        objreturn.push({
            rolename:getuserlistdata.data[i]['rolename'],
            accessmodules:getuserlistdata.data[i]['access']
        })
    }

    return objreturn;

}

const addaccesmoduleModule = async (req)=>{
    var userID = req.body.userid;
    var accsesmodule = req.body.accsessmodule;
    
    if(userID == undefined || isNaN(userID) || accsesmodule == undefined ){
        return{
            status:false,
            err:"invalied parems pass...."
        }
    }

    var sql=`select * from users where user_id = '${userID}';`;
    var check = croud.executeQuery(sql);
    if(!check.status){
        return {
            status:false,
            err:" sql err..."
        }
    }
    if(check.data.length < 1){
        return{
            status:false,
            err:"INVALIED PERAMS PASSS!!!"
        }
    }
    var valuefieldarry = [{field:'access',value:accsesmodule}];
    var condition= `user_id ='${userID}';`;
    var updateuser = await croud.executeQuery(croud.makeUpdateQueryString('users',valuefieldarry,condition));
} 
const rmaccesmoduleModule =async(req)=>{
    var userID = req.body.userid;

    if(userID == undefined || isNaN(userID)){
        return{
            status:false,
            err:"invalied parems pass...."
        }
    }
    var sql=`select * from users where user_id = '${userID}';`;
    var checkuser = croud.executeQuery(sql);
    if(!checkuser.status){
        return {
            status:false,
            err:" sql err..."
        }
    }
    if(checkuser.data.length < 1){
        return{
            status:false,
            err:"INVALIED PERAMS PASSS!!!"
        }
    }
    var valuefieldarry = [{field:'access',value:''}];
    var condition= `user_id ='${userID}';`;
    var updateuser = await croud.executeQuery(croud.makeUpdateQueryString('users',valuefieldarry,condition));

}

const checkusermoduleaccessModule =async(req)=>{
    var userId = req.body.userid;
    var roleID = req.body.roleid;
    if(userId == undefined || roleID == undefined || isNaN(userId) || isNaN(roleID)){
        return{
            status:false,
            err:"invalied parems pass...."
        }
    }
    var checkusers = await croud.executeQuery(`select * from users where user_id ='${userId}';`);
    if(!checkusers.status){
        return{
            status:false,
            err:"sql err...."
        }
    }
    if(checkusers.data.length < 1){
        return{
            status:false,
            err:" data not founed"
        }
    }
    var checkroles = await croud.executeQuery(`select * from roles where role_id ='${roleID}';`);
    if(!checkroles.status){
        return{
            status:false,
            err:" sql errr..."
        }
    }
    if(checkroles.data.length < 1){
        return{
            status:false,
            err:" data not founed"
        }
    }
    var roleuser = checkusers.data[0]['rolename'];
    var namerole = checkroles.data[0]['rolename'];
    if(roleuser == namerole){
        return true;
    }else{
        return false;
    }

}

const setsamedataModule =async(req)=>{
    var arruser =req.body.userid;
    var lastname=req.body.lastname;
    if( arruser == undefined){
        return{
            status:false,
            err:"invalied parems pass...."
        }
    }
    var flag = false;
    console.log(arruser);
    for(i=0;i<arruser.length;i++){
        var userId = arruser[i]['user_id'];
        var valuearr = [{field:'lastname',value:lastname}];
        var condition= ` user_id =${userId}`;
        var setlastname = await croud.executeQuery(croud.makeUpdateQueryString('users',valuearr,condition));
        flag =true;
    }
    return flag;

}

const setdifferntdatuserModule = async(req)=>{
    var user= req.body.user;
    if(user == undefined || user.length < 1){
        return{
            status:false,
            err:"invalied parems pass...."
        }
    }
    var retnflag = false;
    for(i=0;i<user.length;i++){
        var userid = user[i].user_id;
        if(userid == undefined){
            return{
                status:false,
                err:"invalied parems pass...."
            } 
        }
        var valuearry =[]
        var key = Object.keys(user[i]);
        for(k=0;k<key.length;k++){
            if(key[k] == 'firstname' )
            {
                valuearry.push({field:`${key[k]}`,value:user[i]['firstname']});
            }
            if(key[k] == 'access'){
                valuearry.push({field:`${key[k]}`,value:user[i]['access']});
            }
            if(key[k] == 'emailid'){
                valuearry.push({field:`${key[k]}`,value:user[i]['emailid']})  
            }
        }
        var condition =` user_id =${userid}`;
        var set = await croud.executeQuery(croud.makeUpdateQueryString('users',valuearry,condition));
        retnflag =true;
    }

    return retnflag;
}

const getsearchusersModule = async(req)=>{
    var search = req.body.search;
    if(search == undefined){
        return{
            status:false,
            err:'invalied perams pass....'
        }
    }
    var retObj = {status:true,data:[]};
    var sql =` select * from users where firstname LIKE '%${search}%' ;`;
    var getdata = await croud.executeQuery(sql);
    if(!getdata.status){
        return{
            status:false,
            err:"sql err..."
        }
    }
    if(getdata.data.length > 0){
        retObj.data.push(getdata.data);
    }

    return retObj

}

module.exports ={
    getuserlistModule:getuserlistModule,
    addaccesmoduleModule:addaccesmoduleModule,
    rmaccesmoduleModule:rmaccesmoduleModule,
    checkusermoduleaccessModule:checkusermoduleaccessModule,
    setsamedataModule:setsamedataModule,
    setdifferntdatuserModule:setdifferntdatuserModule,
    getsearchusersModule:getsearchusersModule
}