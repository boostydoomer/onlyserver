import { Router } from 'express';
import pool from './db.js';

const router = Router();

router.post('/entername', async (req, res) => {
    const { name } = req.body;
    try {
        // Проверяем, существует ли уже имя
        const checkName = await pool.query(
            'SELECT * FROM modelname WHERE name ILIKE $1',
            [name]
        );

        if (checkName.rows.length > 0) {
            return res.status(400).json({ message: 'Данный аккаунт уже есть в базе данных' });
        }

        // Вставляем новую запись
        const newEntry = await pool.query(
            'INSERT INTO modelname (name) VALUES ($1) RETURNING *',
            [name]
        );

        res.json(newEntry.rows[0]);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Сервер не работает :( скорее всего сейчас ночь и мой сервер просто выключен' });
    }
});

router.post('/like', async (req, res) => {
    try {
        // Увеличиваем счетчик лайков на +1
        await pool.query('UPDATE likes SET counter = counter + 1');

        res.status(200).json({ message: 'Лайк успешно увеличен на +1' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Произошла ошибка при увеличении лайка' });
    }
});

export default router;