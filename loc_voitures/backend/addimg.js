import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

(async () => {
    
    const db = await open({
        filename: 'your_database.db',
        driver: sqlite3.Database
    });

    
    await db.exec(`ALTER TABLE voitures ADD COLUMN image_path TEXT DEFAULT NULL`);

    console.log('Image file path column added to voitures table.');

   
    await db.close();
})();