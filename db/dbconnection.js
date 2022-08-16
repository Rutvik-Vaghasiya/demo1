const {Client}= require('pg');

// const sql_db = mysql.createPool({
//     host:'localhost',
//     user: 'root',
//     password:'',
//     database:'taskdb'
// });

const DB_HOST="35.202.49.159"
const DB_PORT=5432
const DB_USER="cb-user"
const DB_PASSWORD="h4zkMw7jupHxN3wm"
const DB_DATABASE="postgres"

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