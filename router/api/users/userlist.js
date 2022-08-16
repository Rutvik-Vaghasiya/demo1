var express = require('express');
const { get } = require('express/lib/response');
var router = express.Router();
const croud = require('../../crud');
const userModule = require('./userModule.module')
const {sqlcon} =require('../../../db/dbconnection');
const { compileTrust } = require('express/lib/utils');
const res = require('express/lib/response');


const getuserlist = async (req,res)=>{
    const result = await userModule.getuserlistModule(req);
    return res.send(result);
}

const addaccesmodulelist =async (req,res)=>{
    const result =await userModule.addaccesmoduleModule(req);
    return res.send(result);
}

const rmaccessmodulelist = async(req,res)=>{
    const result =await userModule.rmaccesmoduleModule(req);
    return res.send(result);
}
const getcheckusermoduleaccess =async (req,res)=>{
    const result =await userModule.checkusermoduleaccessModule(req);
    return res.send(result);
}
const setsamedatauser =async(req,res)=>{
    const result =await userModule.setsamedataModule(req);
    return res.send(result);
}

const setdifferentdatauser =async(req,res)=>{
    const result =await userModule.setdifferntdatuserModule(req);
    return res.send(result);
}

const getsearchusers =async(req,res){
    const result =await userModule.getsearchusersModule(req);
    return res.send(result);
}
module.exports = {
    getuserlist:getuserlist,
    addaccesmodulelist:addaccesmodulelist,
    rmaccessmodulelist:rmaccessmodulelist,
    getcheckusermoduleaccess:getcheckusermoduleaccess,
    setsamedatauser:setsamedatauser,
    setdifferentdatauser:setdifferentdatauser,
    getsearchusers:getsearchusers
}