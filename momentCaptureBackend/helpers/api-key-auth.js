const express = require("express");
const bodyParser = require("body-parser");
var router = express.Router();
const config = require("../config.json");

// let  api-key  = config["api-key"];

var apikeyAuthenticate =  function  (req, res,next)  {
    console.log("apikeyAuthenticate called ....", req.headers)
    if(req.headers.apikey ==  config["api-key"]){
        //   res.send('Hello World! apikeyAuthenticate called  verified' );
        next();
      }else{
      return res.status(500).json({ message: "Invalid api key" });
      }
}

module.exports = {apikeyAuthenticate}