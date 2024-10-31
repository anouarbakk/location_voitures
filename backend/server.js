import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';


const app = express();
const PORT = 3000;


app.use(cors());


async function openDatabase() {
    return open({
        filename: 'loc_voiture.db',
        driver: sqlite3.Database
    });
}


app.get('/voitures', async (req, res) => {
    try {
        const db = await openDatabase();
        const cars = await db.all('SELECT * FROM voitures');
        console.log('Fetched cars:', cars);
        res.json(cars);
        await db.close();
    } catch (error) {
        console.error('Error fetching cars:', error.message);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});