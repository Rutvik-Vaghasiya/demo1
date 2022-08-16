const {Client}= require('pg');
const dotenv = require('dotenv');

// const sql_db = mysql.createPool({
//     host:'localhost',
//     user: 'root',
//     password:'',
//     database:'taskdb'
// });

const DB_HOST= process.env.DB_HOST
const DB_PORT= process.env.DB_PORT
const DB_USER= process.env.DB_USER
const DB_PASSWORD= process.env.DB_PASSWORD
const DB_DATABASE= process.env.DB_DATABASE

const client = new Client ({
    host : DB_HOST,
    port : DB_PORT,
    user : DB_USER,
    password : DB_PASSWORD,
    database : DB_DATABASE
})

client.connect((err)=>{
    if(err) throw err;

    console.log("database connecting......")
})
// sql_db.Connection( function(err){
//     if(err) throw err;

//     console.log(" Database Connectimg...")
// });


module.exports = {client :client}