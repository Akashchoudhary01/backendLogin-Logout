import express from 'express';
import {signup,  signIn , getUser }  from '../controller/authController.js';
import {jwtAuth} from '../Middleware/jwtAuth.js';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.get('/signin', signIn);
authRouter.get('/user', jwtAuth,  getUser);

export default authRouter;
