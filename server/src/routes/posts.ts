import * as express from 'express';
import {Posts} from '../controllers/posts'
import Middleware from "../middleware/authcheck";
const router = express.Router();

router.get('/:id', Posts.getPost);
router.get('/', Posts.getPosts);
router.get('/search/posts', Posts.getPostsBySearchAndTags);

router.post('/', Middleware.authCheck, Posts.createPost);
router.patch('/:id', Middleware.authCheck, Posts.updatePost);
router.patch('/:id/likedPost', Middleware.authCheck, Posts.likePost);
router.delete('/:id', Middleware.authCheck, Posts.deletePost);

export default router;