const bcrypt = require('bcrypt')


function hashPassword(plainPassword){
  bcrypt.hash(plainPassword,10,function(err, hash){
    if(err) return console.log(err)
    return hash
  })
}

module.exports = {hashPassword}