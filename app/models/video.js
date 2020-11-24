const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    filePath: {
        type: String,
        require:true
    },
    fileName:{
        type: String,
        require:true
    },
    length:{
        type: Number,
        require:true
    },
    author:{
        type: String,
        require:true
    },
    category: { 
        type: String,
        enum : ["FITNESS","FOOD","EXERCISE"],
        require:true
    },
    type: { 
        type: String,
        require:true
    },
    extension: { 
        type: String,
        require:true
    },
    fileSize: {
        type: Number,
        require:true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
},  {
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000
    }
})
const video = mongoose.model('video', videoSchema)

module.exports = video