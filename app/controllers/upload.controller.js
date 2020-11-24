const Audio =  require("../models/audio");
const Video =  require("../models/video");
const createError = require('http-errors');
//const storage = require('../middlewares/s3.audio.middleware')
const singleAudioUpload = require('../middlewares/s3.audio.middleware').single("audio");
const singleVideoUpload = require('../middlewares/s3.video.middleware').single("video");//storage.upload.single("video");

 
const sendError=(e,res)=>{
  const err = new createError.InternalServerError();
  res.status(500).send(err);
}

exports.uploadAudio = async (req, res) => {
  console.log("Upload Audio Api called")
  singleAudioUpload(req,res, async function(err, value){
       if(err){
           console.log(err)
          res.send({"message":"Please upload an audio file"});
       }
        else{
            data = req.file;
            let filePath = data.location;
            let files= filePath.split('/');
            let fileName = files[files.length-1];
            let length = req.body.duration;
            let author = req.body.author
            let category = req.body.category
            let type = "audio"
            let extension = fileName.split('.')[1];
            var fileSizeInBytes = data.size;
            const AudioDetails = {
                filePath: filePath,
                fileName: fileName,
                length: length,
                author: author,
                category: category,
                type:type,
                extension: extension,
                filePath: filePath,
                fileSize: fileSizeInBytes
            }
            console.log("The audio details",JSON.stringify(AudioDetails))
            Audio.create(AudioDetails).then(values=>{
                console.log("Creating document for audio");
                res.status(201).send(values);
            }).catch(e=>{res.send(e)});
        
        }
  });
}

exports.uploadVideo = async (req, res) => {
  console.log("Upload Video Api called")
  try{
    singleVideoUpload(req, res, function(data, err){
        if(err){
            res.send({"message":"Please upload a video file"});
        }
        else{
            data = req.file;
            let filePath = data.location;
            let files= filePath.split('/');
            let fileName = files[files.length-1];
            let length = req.body.duration;
            let author = req.body.author;
            let category = req.body.category;
            let type = "video";
            let extension = fileName.split('.')[1];
            var fileSizeInBytes = data.size;
            const VideoDetails = {
                filePath: filePath,
                fileName: fileName,
                length: length,
                author: author,
                category: category,
                type:type,
                extension: extension,
                filePath: filePath,
                fileSize: fileSizeInBytes
            }
            Video.create(VideoDetails).then(async data=>{
                console.log("Creating document for video");
                res.status(201).send(data);
            }).catch(e=>{res.send(e)});
        }
    });
    }catch(err){
        res.send(err);
    }
}
