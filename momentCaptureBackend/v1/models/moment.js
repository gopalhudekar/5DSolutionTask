const mongoose = require("mongoose");

var Moment = mongoose.model('Moment',{
    title :{type:String},
    tag :{ type:String},
    image :{type:String},
    user_id: {type:String},
    createdAt: {type:Number} 
  
});

module.exports = {
    Moment
};