import express from 'express';
import {signup,  signIn}  from '../controller/authController.js';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.get('/signin', signIn);

export default authRouter;
