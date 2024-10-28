import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors'; // Import the cors package

// Initialize the Express app
const app = express();
const PORT = 3000;

// Use CORS middleware
app.use(cors()); // This will allow all origins to access your API

// Function to open the SQLite database
async function openDatabase() {
    return open({
        filename: 'loc_voiture.db',
        driver: sqlite3.Database
    });
}

// Endpoint to fetch cars from the database
app.get('/voitures', async (req, res) => {
    try {
        const db = await openDatabase();
        const cars = await db.all('SELECT * FROM voitures');
        console.log('Fetched cars:', cars); // Log the fetched cars
        res.json(cars);
        await db.close();
    } catch (error) {
        console.error('Error fetching cars:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});