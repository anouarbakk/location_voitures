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
app.get('/voiture/prix/:id_voiture', async (req, res) => {
    const { id_voiture } = req.params; 

    if (!id_voiture) {
        return res.status(400).json({ message: 'id_voiture is required.' });
    }

    try {
        const db = await openDatabase();
        const car = await db.get('SELECT prix_jour FROM voitures WHERE id_voiture = ?', [id_voiture]);

        if (!car) {
            return res.status(404).json({ message: 'Car not found.' });
        }

        res.json({ prix_jour: car.prix_jour });
        await db.close();
    } catch (error) {
        console.error('Error fetching car price:', error);
        res.status(500).json({ message: 'Internal Server Error' });
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

        req.session.userId = user.id_client;
        req.session.username = `${user.nom} ${user.prenom}`;

        console.log('User  logged in:', { email });
        res.json({ message: 'Login successful', username: req.session.username, userId: req.session.userId });
        await db.close();
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/location', async (req, res) => {
    const { id_client, id_voiture, date_debut, date_fin } = req.body;

    // Check for missing fields
    if (!id_voiture || !id_client || !date_debut || !date_fin) {
        return res.status(400).json({ message: 'All fields must be filled out.' });
    }

    let db;
    try {
        db = await openDatabase();
        await db.run('INSERT INTO locations (id_client, id_voiture, date_debut, date_fin) VALUES (?, ?, ?, ?)', [id_client, id_voiture, date_debut, date_fin]);
        
        console.log('Location created:', { id_voiture, id_client, date_debut, date_fin });
        res.status(201).json({ message: 'Location created successfully.' });
    } catch (error) {
        console.error('Error creating location:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        // Ensure the database connection is closed
        if (db) {
            await db.close();
        }
    }
});

    app.get('/profile/:id_client', async (req, res) => {
        const { id_client } = req.params; // Get id_client from URL parameters
    
        // Validate if id_client is provided
        if (!id_client) {
            return res.status(400).json({ message: 'id_client is required.' });
        }
    
        try {
            const db = await openDatabase();
            const user = await db.get('SELECT nom, prenom, email, telephone FROM clients WHERE id_client = ?', [id_client]);
    
            if (!user) {
                return res.status(404).json({ message: 'User  not found.' });
            }
    
            res.json({ 
                nom: user.nom, 
                prenom: user.prenom, 
                email: user.email, 
                telephone: user.telephone 
            });
    
            await db.close();
        } catch (error) {
            console.error('Error fetching user profile:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });

    app.post('/id_location', async (req, res) => {
        try {
            const db = await openDatabase();
            
            
            const lastLocation = await db.get('SELECT id_location FROM locations ORDER BY id_location DESC LIMIT 1');
    
            if (!lastLocation) {
                return res.status(404).json({ message: 'No locations found.' });
            }
    
            
            res.json({ last_id_location: lastLocation.id_location });
            
            await db.close();
        } catch (error) {
            console.error('Error fetching last location:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });

    app.post('/postPayments', async (req, res) => {
        const { id_location, montant, date_paiement, mode_paiement } = req.body;
    
        
        if (!id_location || !montant || !date_paiement || !mode_paiement) {
            return res.status(400).json({ message: 'All fields must be filled out.' });
        }
    
        try {
            const db = await openDatabase();
            await db.run('INSERT INTO paiements (id_location, montant, date_paiement, mode_paiement) VALUES (?, ?, ?, ?)', [id_location, montant, date_paiement, mode_paiement]);
    
            console.log('Payment recorded:', { id_location, montant, date_paiement, mode_paiement });
            res.status(201).json({ message: 'Payment recorded successfully.' });
        } catch (error) {
            console.error('Error recording payment:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});