const aws = require('aws-sdk');

const config = require('../config/aws.config');
const multerS3 = require('multer-s3');
const multer = require('multer');


aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS,
    region: "ap-south-1",
});
const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
      acl: "public-read",
      s3,
      bucket: process.env.BUCKET_NAME,
      metadata: function (req, file, cb) {
          console.log("The file" + file)
          return cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        console.log(file)
        var fullPath = 'public/'+ file.originalname;
        return cb(null, fullPath);
      },
      destination: (req, file, cb) => {
        cb(null, '/public')
      }
    }),
  });

module.exports = {upload, s3};