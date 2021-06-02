import * as express from 'express';
import {Posts} from '../controllers/posts'
import Middleware from "../middleware/authcheck";
const router = express.Router();

router.get('/', Posts.getPost);
router.post('/', Middleware.authCheck, Posts.createPost);
router.patch('/:id', Middleware.authCheck, Posts.updatePost);
router.patch('/:id/likedPost', Middleware.authCheck, Posts.likePost);
router.delete('/:id', Middleware.authCheck, Posts.deletePost);

export default router;