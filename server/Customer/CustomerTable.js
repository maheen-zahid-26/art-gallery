const db = require("../dbConnections");

const createTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS customers (
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
        console.log("Customers table created or already exists.");
    } catch (err) {
        console.error("Error creating table:", err.message); 
    } finally {
        if (connection) connection.release();
    }
};

module.exports = createTable;
