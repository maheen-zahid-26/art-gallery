const db = require("../dbConnections");

const createArtworkTable = async () => {  
    console.log("Attempting to create artwork table...");
    const query = `
      CREATE TABLE IF NOT EXISTS artwork (
        id INT AUTO_INCREMENT PRIMARY KEY,
        Title VARCHAR(255) NOT NULL,
        Category VARCHAR(100) NOT NULL,
        Type VARCHAR(100) NOT NULL,
        Picture VARCHAR(255),
        ArtistName VARCHAR(255) NOT NULL,
        Price DECIMAL(10, 2) NOT NULL,
        ArtistId VARCHAR(50) NOT NULL
      )
    `;

    let connection;

    try {
        
        connection = await db.getConnection();
        await connection.execute(query);
        console.log("Artwork table created or already exists.");
    } catch (err) {
        console.error("Error creating Artwork table:", err.message);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = { createArtworkTable };
