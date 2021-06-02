import PostModel from '../models/postModel';
import * as mongoose from 'mongoose';

export class Posts{

    static async getPost(req,res){
        try {
            const postMessage = await PostModel.find();
           //  console.log(postMessage);
            res.status(200).json(postMessage);
        }catch (error) {
            res.status(404).json({
                message: error.message
            });
        }
    }

    static async createPost(req, res){
        const post = req.body;
        console.log(post);
       // const newPost = new PostModel(post);
        // new Date().toISOString()
        const newPost = new PostModel({...post, creator: req.userId, createdAt: new Date().toISOString()});
console.log(newPost);
        try {
            await newPost.save();
            res.status(201).json(newPost);
        }catch (error) {
            res.status(409).json({
                message: error.message
            });
        }
    }

    static async updatePost(req,res){
        const {id} = req.params;
        const { title, message, creator, selectedFile, tags } = req.body;

        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(404).send('No post with that id');
        }else{
            const updatedPost = { _id: id, creator, title, message, tags, selectedFile, };
           // console.log(updatedPost);
            const response = await PostModel.findByIdAndUpdate(id, updatedPost, {new: true});
           // console.log(response);
            res.json(response);
        }
    }

    static async likePost(req,res){
        const {id} = req.params;

        if(!req.userId) return res.status(401).send('User is unauthenticated!');

        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(404).send('No post with that id');
        }else{
            const post:any = await PostModel.findById(id);
            const index = post.likes.findIndex((id)=>id===String(req.userId));
            if(index === -1)
            {
                // like the post
                post.likes.push(req.userId)
            }else{
                // dislike a post
                post.likes = post.likes.filter((id)=>id !== String(req.userId));
            }

            const updatedPost = await PostModel.findByIdAndUpdate(id, post, {new: true});

           return  res.json(updatedPost);
        }

    }

    static async deletePost(req,res){
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(404).send('No post with that id');
        }else{
            const response = await PostModel.findByIdAndRemove(id);
            // console.log(response);
            res.json(response);
        }

    }
}