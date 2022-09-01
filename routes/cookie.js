const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
var jwt = require('jsonwebtoken');


router.get('/',(request,response)=>{
})

router.get('/set-cookie/:cookieData',(req,res)=>{
  const cookieInfo = req.params.cookieData
  try{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + 10);
    return res.cookie('user', cookieInfo, {expires: exdate, path: '/', sameSite: 'None', secure:true, httpOnly:true, domain:'poshlyfinance.com'}).status(201).json({message:'Success in setting cookie', code:201})
  }catch(e){
    return res.status(401).json({code:401,message:e})
  }
})

router.get('/verify',(req,res)=>{

  const cookie = req.cookies

  try{
    let decoded = jwt.verify(cookie.user, process.env.ACCESS_TOKEN_SECRET)
    return res.status(201).json({code:200,data:decoded})
  }catch(e){
    return res.status(400).json({code:400,data:'Error, not found'})
  }


  //if(cookie.user,process.env.ACCESS_TOKEN_SECRET){
    // res.send('shit works man')
  // }else{
    // res.send('cookie might work idk')
  // }
})

module.exports = router
