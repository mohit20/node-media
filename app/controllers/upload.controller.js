const db = require("../models");
const Audio =  require("../models/audio");
const Video =  require("../models/video");
const createError = require('http-errors');
var path = require('path')
const upload = require('../middlewares/s3.middleware')
const singleUpload = upload.single("audio");
const getVideoDurationInSeconds = require('node-video-duration');
var multer  = require('multer')
const mm = require('music-metadata');
const { getAudioDurationInSeconds } = require('get-audio-duration');


//var upload1 = multer({ dest: './public/data/uploads/' })

const sendError=(e,res)=>{
  logIt.logIt("ERROR","Somthing went wrong!"+e);
  const err = new createError.InternalServerError();
  res.status(500).send(err);
}

exports.uploadAudio = async (req, res) => {
  console.log("Upload Audio Api called")
  //console.log("The file is " + req.audio)
  
  singleUpload(req,res, async function(err, data){
       if(err){
           console.log(err)
          res.send(err);
       }
        else{
            console.log(req.body, req.file)
            data = req.file;
            let x = await mm.parseFile(data.location)
            let filePath = data.location;
            let fileName= filePath.split('/')[-1];
            //let buffer = await fs.readFileSync(filePath)
            let length = x.duration;
            let author = req.body.userid
            let category = req.body.category
            let type = "audio"
            let extension = filename.split('.')[1]
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
    upload.single('video', async function(data, err){
        if(err){
            res.send(err);
        }
            else{
                let filePath = data.split(':')[1];
                let fileName= data.split(':')[2];
                let length = await getVideoDurationInSeconds(filePath);
                let author = req.body.userid
                let category = req.body.category
                let type = "video"
                let extension = filename.split('.')[1]
                var stats = fs.statSync(filePath)
                var fileSizeInBytes = stats.size;
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
