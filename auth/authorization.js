const jwt = require("jsonwebtoken");
require('dotenv').config()

const authorization = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token) return res.sent({status:false,msg:'missing token'},(err,decoded)=>{
        if(err) return res.json('error with token');
        next()
    })
    jwt.verify(token,process.env.hfgdufnhcdhfunfcggbfhasnu)

}
module.exports=authorization