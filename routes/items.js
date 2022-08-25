const express = require('express')
const router = express.Router()
const db = require('../database/config.js')

router.get('/',async (req,res)=>{
  db.query(`select * from users`, (error,response)=>{
    res.send(response.rows)
  })
})

router.post('/create-item',async(req,res)=>{
  const {userId,item_id, access_token} = req.body
  db.query(`INSERT INTO accounts (access_token, item_id, user_id) VALUES ($1,$2,$3) RETURNING id`,[access_token, item_id, userId], (error,result)=>{
    if(error) return res.status(401).json({code:401,message:'Error in uploading into database'})
    return res.status(201).json({code:201, message:'Successfully inserted into database.',returningId:result.rows[0].id})
  })
})

router.get('/get-items/:userId',(req,res)=>{
  const {userId} = req.params
  db.query(`SELECT * FROM accounts WHERE user_id = ${userId}`,(error,result)=>{
    if(error) return res.status(404).json({code:404,message:"ERROR: No items assosicated with user."})
    return res.status(200).json({code:200, message:'SUCCESS: Accounts found', accounts:result.rows})
  })
})

router.delete('/delete-item',(req,res)=>{
  const {id} = req.body  
  db.query(`DELETE FROM accounts WHERE id = ${id}`,(error,result)=>{
    console.log(error)
    if(error) return res.status(403).json({code:403,message:error})
    return res.status(200).json({code:200,message:'SUCCESS: Successfully deleted item id'})
  })
})

module.exports = router
