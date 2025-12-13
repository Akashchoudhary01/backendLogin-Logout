import express from 'express';
import userRoutes from './Router/authRoute.js';

const app = express();

app.use(express.json());

app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ data: 'jwtAuth API running' });
});

export default app;
