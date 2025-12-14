import express from 'express';
import userRoutes from './Router/authRoute.js';
import {databaseConnect} from './Config/databaseConfig.js';
import dotenv from "dotenv";

databaseConnect();
const app = express();


app.use(express.json());
dotenv.config();

app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ data: 'jwtAuth API running' });
});

export default app;
