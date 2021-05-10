const express = require("express");
const bodyParser = require("body-parser");
var router = express.Router();
const { mongoose} = require('./db.js');
// const apikeyAuthenticate = require("./helpers/api-key-auth")
const config = require("./config.json");
const jwt = require('jsonwebtoken');
var cors = require('cors')
var path = require('path');
var dir = path.join(__dirname, './resources');
var fs = require('fs');

// const momentController = require("./controllers/momentController.js");
const version1 = require("./v1/index.js")
var app = express();

app.use(bodyParser.json());
// app.use(apikeyAuthenticate)
app.use("/resources", express.static(dir));  

app.listen(3000,()=> console.log("server started at port :3000"));





app.use(cors())

app.get("/", apikeyAuthenticate)
app.get('/', function(req,res)
{   
res.send('Hello World!' );
});


app.use('/v1',version1 );



function apikeyAuthenticate(req, res, next)  {
    console.log("apikeyAuthenticate called ....", req.headers)
      if(req.headers.apikey ==  config["api-key"]){
        //   res.send('Hello World! apikeyAuthenticate called  verified' );
        next();
      }else{
      return res.status(500).json({ message: "Invalid api key" });
      }
  }
  