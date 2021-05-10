const express = require("express");
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var cors = require('cors')
var {Moment} = require("../models/moment");

const upload = require("../middleware/upload");
var app = express();
app.use(cors())

// router.post("/upload", async (req,res)=>{
//     console.log("file uploading call")
//     try {
//         await uploadFile(req, res);
    
//         if (req.file == undefined) {
//           return res.status(400).send({ message: "Please upload a file!" });
//         }
    
//         res.status(200).send({
//           message: "Uploaded the file successfully: " + req.file.originalname,
//         });
//       } catch (err) {
//         res.status(500).send({
//           message: `Could not upload the file: ${req.file.originalname}. ${err}`,
//         });
//       }
// })

router.post('/upload',upload.single('file'),function(req, res, next) {
    console.log(req.file);
    if(!req.file) {
      res.status(200).send({ code:400, message:"file not found with request"});
      return next(err);
    }
    res.status(200).json({ code:200, fileUrl: 'http://localhost:3000/resources/' + req.file.filename });
  })

  

  router.post("/save", (req,res)=>{
    let data  = req.body;  
    data.createdAt = new Date(); 
    moment = new Moment(data);
    moment.save((err, docs)=>{
        if (!err){
        //  res.send(docs);
         res.status(200).json({ code:200, message: "Moment saved successfuly", moment: docs});
         }else{
             console.log("Error while creating moment:", err);
             res.status(200).json({code:300, message: "Error while saving moment"});
         }
     });   
})

  router.post("/list", (req,res)=>{
    let id  = req.body.user_id;  
    Moment.find({}, function(err, list){
      if(err) {
          console.log(err);
        }
        var message;
        if(list) {
          let listData  =[];
          list.forEach(function(element) {
            if(req.body.user_id == element.user_id){
              listData.push(element)
            }
          });
            // message = "user already exists";            
            // res.status(500).json({message: message});
            res.status(200).send( {code:200, list: listData});
        } else {    
           message = "No record found";            
            res.status(200).json({code:400, message: message});
        }
      
    });
})




















// const upload = async (req, res) => {
//   try {
//     await uploadFile(req, res);

//     if (req.file == undefined) {
//       return res.status(400).send({ message: "Please upload a file!" });
//     }

//     res.status(200).send({
//       message: "Uploaded the file successfully: " + req.file.originalname,
//     });
//   } catch (err) {
//     res.status(500).send({
//       message: `Could not upload the file: ${req.file.originalname}. ${err}`,
//     });
//   }
// };

// const getListFiles = (req, res) => {
//   const directoryPath = __basedir + "/resources/static/assets/uploads/";

//   fs.readdir(directoryPath, function (err, files) {
//     if (err) {
//       res.status(500).send({
//         message: "Unable to scan files!",
//       });
//     }

//     let fileInfos = [];

//     files.forEach((file) => {
//       fileInfos.push({
//         name: file,
//         url: baseUrl + file,
//       });
//     });

//     res.status(200).send(fileInfos);
//   });
// };

// const download = (req, res) => {
//   const fileName = req.params.name;
//   const directoryPath = __basedir + "/resources/static/assets/uploads/";

//   res.download(directoryPath + fileName, fileName, (err) => {
//     if (err) {
//       res.status(500).send({
//         message: "Could not download the file. " + err,
//       });
//     }
//   });
// };

// module.exports = {
//   upload,
//   getListFiles,
//   download,
// };

module.exports = router;