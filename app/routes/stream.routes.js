module.exports = app => {
    const streamMedia = require("../controllers/stream.controller");
    var router = require("express").Router();

    router.get('/audio' ,streamMedia.streamAudio);
    router.get('/video', streamMedia.streamVideo);
    router.get('/getAllAudio' ,streamMedia.getAllAudio);
    router.get('/getAllVideo', streamMedia.getAllVideo);
    app.use('/api/stream', router);
  };