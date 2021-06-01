"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
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
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const PostModel = mongoose.model('PostModel', postSchema);
exports.default = PostModel;
