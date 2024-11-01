import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

(async () => {

    const db = await open({
        filename: 'loc_voiture.db',
        driver: sqlite3.Database
    });


    await db.exec(`CREATE TABLE IF NOT EXISTS clients (
        id_client INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        prenom TEXT NOT NULL,
        email TEXT DEFAULT NULL UNIQUE,
        telephone TEXT DEFAULT NULL,
        mot_de_passe TEXT DEFAULT NULL
    )`);

    await db.exec(`CREATE TABLE IF NOT EXISTS locations (
        id_location INTEGER PRIMARY KEY AUTOINCREMENT,
        id_client INTEGER DEFAULT NULL,
        id_voiture INTEGER DEFAULT NULL,
        date_debut DATE DEFAULT NULL,
        date_fin DATE DEFAULT NULL,
        statut TEXT DEFAULT 'en cours',
        FOREIGN KEY (id_client) REFERENCES clients (id_client),
        FOREIGN KEY (id_voiture) REFERENCES voitures (id_voiture)
    )`);

    await db.exec(`CREATE TABLE IF NOT EXISTS paiements (
        id_paiement INTEGER PRIMARY KEY AUTOINCREMENT,
        id_location INTEGER DEFAULT NULL,
        montant DECIMAL(10,2) DEFAULT NULL,
        date_paiement DATE DEFAULT NULL,
        mode_paiement TEXT DEFAULT NULL,
        FOREIGN KEY (id_location) REFERENCES locations (id_location)
    )`);

    await db.exec(`CREATE TABLE IF NOT EXISTS voitures (
        id_voiture INTEGER PRIMARY KEY AUTOINCREMENT,
        marque TEXT DEFAULT NULL,
        modele TEXT DEFAULT NULL,
        annee INTEGER DEFAULT NULL,
        immatriculation TEXT DEFAULT NULL UNIQUE,
        prix_jour DECIMAL(10,2) DEFAULT NULL,
        image_path TEXT DEFAULT NULL,
        disponible INTEGER DEFAULT 1
    )`);


    const voituresData = [
        [11, 'Volkswagen', 'Golf', 2020, '223 TN 448', 110.00, 1,"./assets/golf-8.jpg"],
        [12, 'Toyota', 'Camry', 2020, '223 TN 4458', 145.00, 1,"./assets/camri.jpg"],
        [13, 'Hyundai', 'Sonata', 2019, '240 TN 3001', 140.00, 1,"./assets/sonata.jpg"],
        [14, 'Honda', 'Civic', 2020, '223 TN 548', 95.00, 1,"./assets/Civic.jpg"],
        [15, 'Holden', 'Captiva', 2020, '223 TN 302', 105.00, 1,"./assets/captiva.jpg"],
        [16, 'Suzuki', 'Jimny', 2020, '223 TN 1010', 160.00, 1,"./assets/jimny.jpg"],
        [17, 'Jeep', 'Cherokee', 2020, '223 TN 1012', 175.00, 1,"./assets/Cherokee.jpg"],
        [18, 'Nissan', 'X-Trail', 2020, '223 TN 1017', 140.00, 1,"./assets/nissan.jpg"],
        [19, 'Mercedez-Benz', 'GLC', 2020, '223 TN 1524', 220.00, 1,"./assets/glc.jpg"],
        [20, 'BMW', '320i', 2018, '240 TN 3111', 220.00, 0,"./assets/320i.jpg"]
    ];

 
    const insertVoiture = await db.prepare(`INSERT INTO voitures (id_voiture, marque, modele, annee, immatriculation, prix_jour, disponible, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);

   
    for (const voiture of voituresData) {
        await insertVoiture.run(...voiture);
    }


    await insertVoiture.finalize();

    
    await db.close();
    console.log('Database setup complete.');
})();