import express from 'express';
import {signup,  signIn , getUser}  from '../controller/authController.js';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.get('/signin', signIn);
authRouter.get('/user', getUser);

export default authRouter;
