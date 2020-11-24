const db = require("../models");
const Audio =  require("../models/audio");
const Video =  require("../models/video");
const createError = require('http-errors');
request = require('request')
 
//var upload1 = multer({ dest: './public/data/uploads/' })

const sendError=(e,res)=>{
  const err = new createError.InternalServerError();
  res.status(500).send(err);
}

exports.getAllAudio = (req, res) => {
    console.log("Get all audio")
    Audio.find({})
      .then(data => {
        const finalTime = Date.now()
        console.log('Got all Audio')
        res.send(data);
      })
      .catch(err => {
        console.log("Something went wrong " + err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while fetching Audio."
        });
    });
};
  
exports.getAllVideo = (req, res) => {
    console.log("Get all video")
    Video.find({})
      .then(data => {
        const finalTime = Date.now()
        console.log('Got all video')
        res.send(data);
      })
      .catch(err => {
        console.log("Something went wrong " + err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while fetching Audio."
        });
    });
};
  
exports.streamAudio = async(req, res) =>{
  console.log("In streamAudio")
  console.log(req.query.fileName)
  Audio.findOne({fileName:req.query.fileName}).lean().then(function(data){
    var fileUrl = data.filePath;
    var range = req.headers.range;
    if(!range)
      range='0-'
    //console.log(range)
    var positions, start, end, total, chunksize;
  
    function setResponseHeaders(headers){
      positions = range.replace(/\D/g, "").split("-");
      start = parseInt(positions[0], 10); 
      total = headers['content-length'];
      end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      chunksize = (end-start)+1;
    
      res.writeHead(206, { 
        "Content-Range": "bytes " + start + "-" + end + "/" + total, 
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type":"audio/mp3"
      });
    }
    
    function pipeToResponse() {
      var options = {
        url: fileUrl,
        headers: {
          range: "bytes=" + start + "-" + end,
          connection: 'keep-alive'
        }
      };
      request(options).pipe(res);
    }
    // HEAD request for file metadata
    request({
      url: fileUrl,
      method: 'HEAD'
    }, function(error, response, body){
      setResponseHeaders(response.headers);
      pipeToResponse();
    });
  })
}

exports.streamVideo = async(req, res) =>{
  console.log("In streamVideo")
  console.log(req.query.fileName)
  Video.findOne({fileName:req.query.fileName}).lean().then(function(data){
    var fileUrl = data.filePath;
    var range = req.headers.range;
    if(!range)
      range='0-'
    //console.log(range)
    var positions, start, end, total, chunksize;
  
    function setResponseHeaders(headers){
      positions = range.replace(/\D/g, "").split("-");
      start = parseInt(positions[0], 10); 
      total = headers['content-length'];
      end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      chunksize = (end-start)+1;
    
      res.writeHead(206, { 
        "Content-Range": "bytes " + start + "-" + end + "/" + total, 
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type":"video/mp4"
      });
    }
    
    function pipeToResponse() {
      var options = {
        url: fileUrl,
        headers: {
          range: "bytes=" + start + "-" + end,
          connection: 'keep-alive'
        }
      };
      request(options).pipe(res);
    }
    // HEAD request for file metadata
    request({
      url: fileUrl,
      method: 'HEAD'
    }, function(error, response, body){
      setResponseHeaders(response.headers);
      pipeToResponse();
    });
  })
}