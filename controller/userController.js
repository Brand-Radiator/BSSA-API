const userModel = require('../model/userModel')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require('dotenv').config()



// POST /data - Insert data into MongoDB
const userSignUp= async  (req, res) => {

  const data = req.body;
  // console.log('data',  data)
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  const imageUrl = req.file.path;


  if(!name)     return res.send({code:400 , message:"name required"})
  if(!email)     return res.send({code:400 , message:"email required"})
  const checkEmail = await userModel.find({email});
  // if(checkEmail) return res.send({code:400 , message:"email already exits"})
  if(!password)     return res.send({code:400 , message:"password required"})
  if(!role)     return res.send({code:400 , message:"role required"})
  if(!imageUrl)     return res.send({code:400 , message:"imageUrl required"})

  const createUser = await userModel.create({name:name, email:email,role:role, password:password,imageUrl:imageUrl})
  // console.log("createUser-------",createUser)
  return res.send({code:200 , message:createUser});
}
module.exports.userSignUp=userSignUp


// get the data from db
const getUser= async  (req, res) => {
  userModel.find()
  .then(users => res.json(users))
  .catch(err => res.json(err))

};
module.exports.getUser=getUser




//  for login into

const userLogin =async(req,res)=>{
  try{
    const {email, password} = req.body;
    try{
      const user = await userModel.findByCredentials(email,password)

      // use the json web token from here
      // generate the jwt token
      const token = jwt.sign({email:user.email, role:user.role},process.env.JWT_SECRETE,{expiresIn:'1h'})
      console.log('token----',token)
      // store the token inside the cookie
      res.cookie('tokenhddhhddg', token)
      // ============================





      res.json(user)
    }
    catch(e){
      res.status(400).send(e.message)
    }

    console.log(email, password)
  }
  catch(e){
    return res.status(400).send({status:false,msg:e.message})}
  }
module.exports.userLogin=userLogin
