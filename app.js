import express from 'express';
import userRoutes from './Router/authRoute.js';
import {databaseConnect} from './Config/databaseConfig.js';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

databaseConnect();
const app = express();

//cookie-Parser
app.use(cookieParser());


app.use(express.json());
dotenv.config();

app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ data: 'jwtAuth API running' });
});

export default app;
