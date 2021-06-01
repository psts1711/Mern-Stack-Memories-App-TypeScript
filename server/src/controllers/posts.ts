import PostModel from '../models/postModel';
import * as mongoose from 'mongoose';

// QUERY -> /posts?page=1 -> page = 1
// PARAMS -> /posts/123 -> id = 123

export class Posts{

    static async getPosts(req,res){
        const {page} = req.query;
        try {
            const perPagePosts = 8;
            const startIndex = (Number(page)-1) * perPagePosts;
            const totalPosts = await PostModel.countDocuments({});

            const posts = await PostModel.find().sort({ _id: -1}).limit(perPagePosts ).skip(startIndex)
           //  console.log(postMessage);
            res.status(200).json({
                data: posts,
                currentPage: Number(page),
                totalNumberOfPages: Math.ceil(totalPosts/perPagePosts)
            });
        }catch (error) {
            res.status(404).json({
                message: error.message
            });
        }
    }

    static async getPost(req,res){
        const {id} = req.params;
        try{
            const post = await PostModel.findById(id);
            res.status(200).json(post)
        }catch (error) {
            res.status(400).json({message: error.message})
        }
    }

    static async createPost(req, res){
        const post = req.body;
        console.log(post);
       // const newPost = new PostModel(post);
        // new Date().toISOString()
        const newPost = new PostModel({...post, creator: req.userId, createdAt: new Date().toISOString()});
        //console.log(newPost);
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

    static async getPostsBySearchAndTags(req,res){
        const {searchQuery, tags} = req.query
        try {
            const title = new RegExp(searchQuery, 'i') // i flags means = Test test TEST -> test
            const posts = await PostModel.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});
            //res.json({data: post})
            res.status(200).json({ data: posts });
        }catch (error) {
            console.log(error.message)
            res.status(404).json({
                message: error.message
            });
        }
    }

}