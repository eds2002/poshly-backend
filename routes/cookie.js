const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
var jwt = require('jsonwebtoken');

router.use(cookieParser())

router.get('/',(request,response)=>{
})

router.get('/set-cookie/:cookieData',(req,res)=>{
  const cookieInfo = req.params.cookieData
  try{
    return res.cookie('user', cookieInfo, { httpOnly:true, maxAge: 24 * 60 * 60 * 1000}).status(201).json({message:'Success in setting cookie', code:201})
  }catch(e){
    return res.status(401).json({code:401,message:e})
  }
})

router.get('/verify',(req,res)=>{
  console.log(req.cookies)
  // if(jwt.verify(req.headers?.cookie,process.env.ACCESS_TOKEN_SECRET)){
  //   console.log('cookie works bro')
  //   console.log(req.headers.cookie)
  // }else{
  //   console.log(req.headers.cookie)
  // }
})

module.exports = router