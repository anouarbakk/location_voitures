import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

async function openDatabase() {
    return open({
        filename: 'loc_voiture.db',
        driver: sqlite3.Database
    });
}

// GET endpoint to fetch cars
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

// POST endpoint to handle signup data
app.post('/signup', async (req, res) => {
    const { name, firstname, phone, email, password } = req.body;

    // Basic validation
    if (!name || !firstname || !phone || !email || !password) {
        return res.status(400).json({ message: 'All fields must be filled out.' });
    }

    // Check if the phone number is valid
    if (!/^\d{8}$/.test(phone)) {
        return res.status(400).json({ message: 'The phone number must contain exactly 8 digits.' });
    }

    // Check if the email is valid
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    try {
        const db = await openDatabase();
        
        // Insert the new user into the database
        await db.run('INSERT INTO users (name, firstname, phone, email, password) VALUES (?, ?, ?, ?, ?)', [name, firstname, phone, email, password]);

        console.log('User  signed up:', { name, firstname, phone, email });
        res.status(201).json({ message: 'User  signed up successfully.' });

        await db.close();
    } catch (error) {
        console.error('Error signing up user:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});