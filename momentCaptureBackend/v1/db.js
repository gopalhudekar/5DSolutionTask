const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.DB_Connect,{ useNewUrlParser: true , useUnifiedTopology: true}, (err)=>{
    if(!err){
        console.log("MongoDb Connected ....");
    }else{
        console.log("Error in DB connection:", err);
    }
});

module.exports= mongoose;

// var MongoClient = require('mongodb').MongoClient;
// MongoClient.connect("mongodb+srv://gopal:gopal1234@cluster0.7w1t9.gcp.mongodb.net/CrudDB?retryWrites=true&w=majority", function (err, db) {
   
//      if(err){
//         console.log("Error in DB connection:", err);
//         throw err;
//      }
//      else{
//         console.log("MongoDb Connected ....");
//      }


//      //Write databse Insert/Update/Query code here..
                
// });

// module.exports= MongoClient;


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://gopal:gopal1234@cluster0.7w1t9.gcp.mongodb.net/CrudDB?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
// client.connect((err, db) => {
//   // const collection = client.db("CrudDB")
//   // perform actions on the collection object
  
//   if(err){
//     console.log("Error occure to connect mongo", err);
//   }else{
//     console.log("Connected to mongo");
//   }
//   // console.log("collection ddemployee:", collection);
  
//  // client.close();
// //  db.collection('employees').insertOne({
// //     name: "gopal3",
// //     position: "NewEmployee",
// //     office :"tagline tech",
// //     salary:30000,
// // });
// });

// module.exports = MongoClient;