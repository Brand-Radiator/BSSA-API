const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser")
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const route = require("./routes/userRoutes")
const app = express();
app.use(express.static('public')) // used to show image

// Use CORS middleware
// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['GET','POST'],
//     credentials:true
// }));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('*', cors({//* means cors applied for all api's and roots
    origin: true,//allow to hit different(url) from frontend from server side
    credentials: true//store cookie
}))









mongoose.connect("mongodb+srv://shivambrandradiator:77yi7EOxaW49mmsa@cluster0.m0vegsu.mongodb.net/CMS", {
    UseNewUrlParser: true
}).then(() => console.log("MongoDb is Connected"))
    .catch(err => console.log(err))


app.use("/", route);



app.listen(process.env.PORT || 5000, function (req, res) {
    console.log("Express port is running on port :-" + (process.env.PORT || 5000))
})