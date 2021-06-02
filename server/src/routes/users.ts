import * as express from 'express';
import {Users} from '../controllers/users'
const router = express.Router();

router.post('/signin', Users.signin);
router.post('/signup', Users.signup);

export default router;