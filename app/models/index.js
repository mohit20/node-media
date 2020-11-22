const mongodbConfig = require('../config/mongo.config.js')
const mongoose = require('mongoose')
mongoose.connect(mongodbConfig.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

