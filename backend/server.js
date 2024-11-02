import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';
import session from 'express-session';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(session({
    secret: 'Anouar123',
    resave: false,
    saveUninitialized: true,
}));

async function openDatabase() {
    return open({
        filename: 'loc_voiture.db',
        driver: sqlite3.Database
    });
}

// Existing endpoint to fetch cars
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


app.post('/login', async (req, res) => {
    const { email, mot_de_passe } = req.body;

    if (!email || !mot_de_passe) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const db = await openDatabase();
        const user = await db.get('SELECT * FROM clients WHERE email = ?', [email]);

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        
        if (user.mot_de_passe !== mot_de_passe) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        req.session.userId = user.id;
        req.session.username = `${user.nom} ${user.prenom}`;

        console.log('User  logged in:', { email });
        res.json({ message: 'Login successful', username: req.session.username });
        await db.close();
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.get('/profile', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    res.json({ message: 'This is your profile.' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});