const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
var router = express.Router();
var cors = require('cors');
var userController = require("./controllers/userController");



const momentController = require("./controllers/momentController.js");

var app = express();

app.use(bodyParser.json());

// app.listen(3000,()=> console.log("server started at port :3000"));
app.use(cors())
app.get('/',function(req,res)
{
    
res.send('Hello World!  this is v1');
});


app.use('/user', userController);

app.use('/moment', momentController);


module.exports = app;