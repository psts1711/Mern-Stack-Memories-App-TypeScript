"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts = void 0;
const postModel_1 = require("../models/postModel");
const mongoose = require("mongoose");
class Posts {
    static getPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postMessage = yield postModel_1.default.find();
                //  console.log(postMessage);
                res.status(200).json(postMessage);
            }
            catch (error) {
                res.status(404).json({
                    message: error.message
                });
            }
        });
    }
    static createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = req.body;
            console.log(post);
            // const newPost = new PostModel(post);
            // new Date().toISOString()
            const newPost = new postModel_1.default(Object.assign(Object.assign({}, post), { creator: req.userId, createdAt: new Date().toISOString() }));
            console.log(newPost);
            try {
                yield newPost.save();
                res.status(201).json(newPost);
            }
            catch (error) {
                res.status(409).json({
                    message: error.message
                });
            }
        });
    }
    static updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { title, message, creator, selectedFile, tags } = req.body;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).send('No post with that id');
            }
            else {
                const updatedPost = { _id: id, creator, title, message, tags, selectedFile, };
                // console.log(updatedPost);
                const response = yield postModel_1.default.findByIdAndUpdate(id, updatedPost, { new: true });
                // console.log(response);
                res.json(response);
            }
        });
    }
    static likePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!req.userId)
                return res.status(401).send('User is unauthenticated!');
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).send('No post with that id');
            }
            else {
                const post = yield postModel_1.default.findById(id);
                const index = post.likes.findIndex((id) => id === String(req.userId));
                if (index === -1) {
                    // like the post
                    post.likes.push(req.userId);
                }
                else {
                    // dislike a post
                    post.likes = post.likes.filter((id) => id !== String(req.userId));
                }
                const updatedPost = yield postModel_1.default.findByIdAndUpdate(id, post, { new: true });
                return res.json(updatedPost);
            }
        });
    }
    static deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).send('No post with that id');
            }
            else {
                const response = yield postModel_1.default.findByIdAndRemove(id);
                // console.log(response);
                res.json(response);
            }
        });
    }
}
exports.Posts = Posts;
