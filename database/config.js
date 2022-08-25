const {Client} = require('pg')

const DB_HOST = process.env.POSTGRESS_HOST
const DB_USER = process.env.POSTGRESS_USER
const DB_PORT = process.env.POSTGRESS_PORT
const DB_PASSWORD = process.env.POSTGRESS_PASSWORD
const DB_DATABASE = process.env.POSTGRESS_DATABASE
const db = new Client({
  host:DB_HOST, 
  user:DB_USER,
  port:DB_PORT,
  password:DB_PASSWORD,
  database:DB_DATABASE
})

db.on("connect", ()=>{
  console.log('Database connection')
})

db.on('end',()=>{
  console.log('Connection end')
})


module.exports = db;