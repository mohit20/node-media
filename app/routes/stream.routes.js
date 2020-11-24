module.exports = app => {
    const streamMedia = require("../controllers/stream.controller");
    var router = require("express").Router();

    router.get('/streamAudio' ,streamMedia.streamAudio);
    router.get('/streamVideo', streamMedia.streamVideo);
    router.get('/getAllAudio' ,streamMedia.getAllAudio);
    router.get('/getAllVideo', streamMedia.getAllVideo);
    app.use('/api/stream', router);
  };