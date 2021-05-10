const express = require("express");
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const Bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require("../../config.json");
var {User} = require("../models/user");

const accessTokenSecret  = config["accessTokenSecret"];
var refreshTokens = [];
router.post("/register", (req,res)=>{
   
    User.findOne({email: req.body.email}, function(err, user){
        if(err) {
            console.log(err);
          }
          var message;
          if(user) {
           
              message = "user already exists";    
              console.log( message + " :" ,  user)        
              res.status(200).json({ code : 300 , message: message});
              // res.status(200).send(user);
          } else {    
            req.body.password = Bcrypt.hashSync(req.body.password, 10);
            // var user = new UserModel(request.body);
            // var result = await user.save();
            // response.send(result);

            let data  = req.body;
            data.email = data.email.toLowerCase();
            user = new User(data);
            user.save((err, docs)=>{
                if(!err){
                 res.status(200).json({ code : 200 , message: "User successfuly registered" , user: docs});
                 }else{
                     console.log("Error while creating employee:", err);
                 }
             });
          }

        
      });

    // data.createdAt = new Timestamp();
    // cat = new User(data);
    // cat.save((err, docs)=>{
    //     if (!err){
    //      res.send(docs);
    //      }else{
    //          console.log("Error while creating employee:", err);
    //      }
    //  });
})

router.post("/login", (req,res)=>{
  console.log("req.body :" ,req.body.email)
  User.findOne({email: req.body.email}, function(err, user){
    if(err) {
        console.log(err);
      }   
      if(user) {
        if(Bcrypt.compareSync(req.body.password, user.password)) {
          // res.status(200).send(user);
        
            // Generate an access token
            const accessToken = jwt.sign({ user }, accessTokenSecret);
            refreshTokens.push(accessToken);
            res.status(200).json({code : 200,
                accessToken : accessToken,
                user: user
            });
        
        }else{      
          return res.status(200).send({code:400, message: "The password is invalid" });
        }

         
      } else {                  
          res.status(200).json({code:400, message: "User does not exist with requested email number"});
      }
    
  });

});

router.get('/logout', (req, res) => {
  let authHeader = req.headers.authorization;
  // jwt.refreshTokens
  
  if(authHeader){
    let token = authHeader;  
    refreshTokens = refreshTokens.filter(token => t !== token);
    
  res.status(200).send({code: 200 , message:"Logout successful"});
  }else{
    res.status(200).send({code: 400 , message:"Error while logout"});
  }
});


router.post("/getUserByMobileNo", (req,res)=>{
  let data  = req.body;

  User.findOne({mobileNo: req.body.mobileNo}, function(err, user){
      if(err) {
          console.log(err);
        }
        var message;
        if(user) {
          console.log(user)
            // message = "user already exists";            
            // res.status(500).json({message: message});
            res.status(200).send(user);
        } else {    
           message = "user not exists";            
            res.status(500).json({message: message});
        }
      
    });
  });

router.post("/getUserByEmail",authenticateJWT, (req,res)=>{
  let data  = req.body;
    console.log(" req.user  :" ,  req.user )
  User.findOne({email: req.body.email}, function(err, user){
      if(err) {
          console.log(err);
        }
        var message;
        if(user) {
          console.log(user)
            // message = "user already exists";            
            // res.status(500).json({message: message});
            res.status(200).send({code:200, user:user});
        } else {    
           message = "user not exists";            
            res.status(200).json({code:400, message: message});
        }
      
    });
  });

router.post("/getUserById",authenticateJWT, (req,res)=>{
  let data  = req.body;
  console.log(" req.user  :" ,  req.user )
  User.findById(req.body.user_id, function(err, user){
      if(err) {
          console.log(err);
        }
        var message;
        if(user) {
          console.log(user)
            // message = "user already exists";            
            // res.status(500).json({message: message});
            res.status(200).send({code:200, user:user});
        } else {    
           message = "user not exists";            
            res.status(200).json({code:400, message: message});
        }
      
    });
  });


  function authenticateJWT (req, res, next)  {
    const authHeader = req.headers.authorization;
    console.log(" authenticateJWT : ",req.headers )

    if (authHeader) {
        // const token = authHeader.split(' ')[1];
        const token = authHeader;

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(200).send({code:401 , message:"Not authorized to access user details"});
            }

            req.user = user;
            next();
        });
    } else {
      return res.sendStatus(200).send({code:401 , message:"authorization header missing"});
    }
};

module.exports = router;