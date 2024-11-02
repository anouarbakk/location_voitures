import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); 

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
        console.error('Error fetching cars:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/signup', async (req, res) => {
    const { nom, prenom, telephone, email, mot_de_passe } = req.body;

    
    if (!nom || !prenom || !telephone || !email || !mot_de_passe) {
        return res.status(400).json({ message: 'All fields must be filled out.' });
    }

 
    if (!/^\d{8}$/.test(telephone)) {
        return res.status(400).json({ message: 'The phone number must contain exactly 8 digits.' });
    }

   
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    try {
        const db = await openDatabase();
        
        
        await db.run('INSERT INTO clients (nom, prenom, telephone, email, mot_de_passe) VALUES (?, ?, ?, ?, ?)', [nom, prenom, telephone, email, mot_de_passe]);

        console.log('User  signed up:', { nom, prenom, telephone, email });
        res.status(201).json({ message: 'User  signed up successfully.' });

        await db.close();
    } catch (error) {
        console.error('Error signing up user:', error);
        if (error.code === 'SQLITE_CONSTRAINT') {
            return res.status(409).json({ message: 'Email already exists.' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});