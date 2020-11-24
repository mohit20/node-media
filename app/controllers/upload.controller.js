const db = require("../models");
const Audio =  require("../models/audio");
const Video =  require("../models/video");
const createError = require('http-errors');
var path = require('path')
const storage = require('../middlewares/s3.middleware')
const singleAudioUpload = storage.upload.single("audio");
const singleVideoUpload = storage.upload.single("video");
const getVideoDurationInSeconds = require('node-video-duration');
var multer  = require('multer')
const mm = require('music-metadata');
 
 
//var upload1 = multer({ dest: './public/data/uploads/' })

const sendError=(e,res)=>{
  logIt.logIt("ERROR","Somthing went wrong!"+e);
  const err = new createError.InternalServerError();
  res.status(500).send(err);
}

exports.uploadAudio = async (req, res) => {
  console.log("Upload Audio Api called")
  //console.log("The file is " + req.audio)
  
  singleAudioUpload(req,res, async function(err, data){
       if(err){
           console.log(err)
          res.send(err);
       }
        else{
            //console.log(req.body, req.file)
            data = req.file;
            let filePath = data.location;
            let files= filePath.split('/');
            let fileName = files[files.length-1];
            //console.log(fileName)
            let length = req.body.duration;
            let author = req.body.author
            let category = req.body.category
            let type = "audio"
            let extension = fileName.split('.')[1]
            //console.log(extension)
            var fileSizeInBytes = data.size;
            const AudioDetails = {
                filePath: filePath,
                fileName: fileName,
                length: length,
                author: author,
                category: category,
                extension: extension,
                filePath: filePath,
                fileSize: fileSizeInBytes
            }
            console.log(AudioDetails)
            Audio.create(AudioDetails).then(async data=>{
                console.log("Creating document for audio");
                res.status(201).send(data);
            }).catch(e=>{sendError(e,res)});
        }
  });
}

exports.uploadVideo = async (req, res) => {
  console.log("Upload Video Api called")
  try{
    singleVideoUpload(req, res, async function(data, err){
        if(err){
            res.send(err);
        }
            else{
                data = req.file;
                let filePath = data.location;
                let files= filePath.split('/');
                let fileName = files[files.length-1];
                //console.log(fileName)
                let length = req.body.duration;
                let author = req.body.author
                let category = req.body.category
                let type = "video"
                let extension = fileName.split('.')[1]
                //console.log(extension)
                var fileSizeInBytes = data.size;
                const VideoDetails = {
                    filePath: filePath,
                    fileName: fileName,
                    length: length,
                    author: author,
                    category: category,
                    extension: extension,
                    filePath: filePath,
                    fileSize: fileSizeInBytes
                }
                console.log(VideoDetails)
                Video.create(VideoDetails).then(async data=>{
                    console.log("Creating document for video");
                    res.status(201).send(data);
                }).catch(e=>{sendError(e,res)});
            }
    });
    }catch(err){
        res.send(err);
    }
}
