import { Router } from 'express';
import db from './mongodb.js';

const router = Router();

router.post('/entername', async (req, res) => {
    const { name } = req.body;
    try {
        const existingName = await db.collection('modelname').findOne({ name });
        if (existingName) {
            return res.status(400).json({ message: 'Данный аккаунт уже есть в базе данных' });
        }
        const newEntry = await db.collection('modelname').insertOne({ name });
        res.json(newEntry.ops);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Произошла ошибка при добавлении имени' });
    }
});

router.post('/like', async (req, res) => {
    try {
        let like = await db.collection('like').findOne();
        
        if (!like) {
            like = await db.collection('like').insertOne({ counter: 1 });
        } else {
            await db.collection('like').updateOne({}, { $inc: { counter: 1 } });
        }

        res.status(200).json({ message: 'Лайк успешно увеличен на +1' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Произошла ошибка при увеличении лайка' });
    }
});

export default router;