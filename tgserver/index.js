import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import MainRouter from './router.js';
import './mongodb.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', MainRouter);

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', 'upgrade-insecure-requests');
    next();
});

async function start() {
    try {
        app.listen(PORT, ()=> console.log(`сервер запущен на ${PORT} порту`))
    } catch (e) {
        console.log(e)
    }
}

start()