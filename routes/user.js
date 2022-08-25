const express = require('express')
const router = express.Router()
const db = require('../database/config.js')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

router.use(cors())
router.use(cookieParser())

router.get('/',(request,response)=>{
  response.send('hey we work')
})

router.post('/register',(req,res)=>{
  res.cookie('register','works')
  const {firstName, lastName, email, password} = req.body
  // TODO, search for given email, if email is found return error
  db.query('SELECT * FROM users WHERE email LIKE $1', [email],(error,result)=>{
    if(error) return res.status(400).json({code:400,error:error})
    if(result.rowCount != 0) return res.status(409).json({code:409,message:'Email already in use. Forgot password?'})
    // TODO, hash passwords & store into datebase
    bcrypt.hash(password,10,(err, hashedPass)=>{
      // TODO, query to database, store user information along with new hashed password
      db.query('INSERT INTO "users" (email,password,first_name,last_name) VALUES ($1,$2,$3,$4)', [email, hashedPass, firstName,lastName],(error,result)=>{
        if(error) return res.status(400).json({code:400,error:error})
        return res.status(200).json({code:200,message:'Successfully inserted'})
      })
    })
  })
})

router.post('/login',(req,res)=>{
  const {email, password} = req.body
  // TODO, check if there is an email in the database that matches the email the user inputed
  db.query('SELECT * FROM users WHERE email LIKE $1', [email],(error,dbResult)=>{
    if(error) return res.status(400).json({code:400,error:error})
    if(dbResult.rows === 0) return res.status(409).json({code:409,message:'There is no account associated with that email.'})
    // TODO, compare password user inputed to the hashed password stored in the database
    bcrypt.compare(password,dbResult.rows[0].password,(error,result)=>{
      if(error) return res.status(400).json({code:400, message:error})
      if(!result) return res.status(401).json({code:401,message:'Incorrect password, try again.'}) 
      const currentUser = {
        userId: dbResult.rows[0].id,
        firstName: dbResult.rows[0].first_name,
        lastName: dbResult.rows[0].last_name,
        email: dbResult.rows[0].email
      }

      // TODO, create jwt, send information back to client
      const accessToken = jwt.sign(currentUser,process.env.ACCESS_TOKEN_SECRET)
      res.status(201).json({code:201,message:`Success`, jwt:accessToken})
    })
  })
})

module.exports = router