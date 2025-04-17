// createArtistTable.js
const db = require("../dbConnections");

const createArtistTable = async () => {
    console.log("Attempting to create artists table...");
    const query = `
      CREATE TABLE IF NOT EXISTS artists (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(52) NOT NULL,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        mobile VARCHAR(15) NOT NULL,
        email VARCHAR(50) NOT NULL,
        dob DATE NOT NULL,
        address1 VARCHAR(100) NOT NULL,
        address2 VARCHAR(100),
        city VARCHAR(50) NOT NULL,
        state VARCHAR(50) NOT NULL,
        country VARCHAR(50) NOT NULL,
        photo VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    let connection;

    try {
  
        connection = await db.getConnection();
        await connection.execute(query); 
        console.log("Artists table created or already exists.");
    } catch (err) {
        console.error("Error creating artists table:", err.message);
    } finally {
        if (connection) connection.release(); 
    }
};

module.exports = { createArtistTable };
