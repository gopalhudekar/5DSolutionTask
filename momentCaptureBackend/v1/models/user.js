const mongoose = require("mongoose");

var User = mongoose.model('User',{
    firstName :{type:String},
    lastName : {type:String},
    mobileNo :{ type:Number},
    email :{type:String},
    // role : {type:String},
    // isMobileVerified: { type:Boolean},
    // mobVerificationOTP : {type:Number},
    password: {type:String},
    city :{type:String}
});

module.exports = {
    User
};