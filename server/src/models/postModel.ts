import * as mongoose from 'mongoose';
var moment = require('moment');

let date = moment().format();
//console.log(date);

const postSchema = new mongoose.Schema({

    title: String,
    message: String,
    creator: String,
    name: String,
    tags: [String],
    selectedFile: String,
    likes:{
        type: [String],
        default: []
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

});

const PostModel = mongoose.model('PostModel', postSchema);
export default PostModel;