import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

async function connect() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (e) {
        console.error(e);
    }
}

connect();

const db = client.db(process.env.MONGODBBASE);

export default db;