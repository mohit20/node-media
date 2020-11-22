module.exports = app => {
    const uploadMedia = require("../controllers/upload.controller");
    const upload = require('../middlewares/s3.middleware');
    var router = require("express").Router();

    router.post('/uploadAudio' ,uploadMedia.uploadAudio);
    router.post('/uploadVideo', uploadMedia.uploadVideo);
    app.use('/api/upload', router);
  };