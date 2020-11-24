module.exports = app => {
    const uploadMedia = require("../controllers/upload.controller");
    var router = require("express").Router();

    router.post('/audio' ,uploadMedia.uploadAudio);
    router.post('/video', uploadMedia.uploadVideo);
    app.use('/api/upload', router);
  };