const db = require("../dbConnections");

const createExhibitionTable = async (tableName) => {
  return new Promise((resolve, reject) => {
    db.getConnection()
      .then((connection) => {
        const createTableQuery = `
          CREATE TABLE IF NOT EXISTS ${tableName} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL,
            mobile VARCHAR(20),
            email VARCHAR(255) NOT NULL,
            dateOfBirth DATE,
            address VARCHAR(255),
            city VARCHAR(255),
            state VARCHAR(255),
            country VARCHAR(255),
            photo VARCHAR(255),
            participationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP

          )`;
        
        connection.query(createTableQuery, (error) => {
          connection.release();
          if (error) {
            console.error(`Error creating table ${tableName}:`, error);
            return reject({ status: 500, message: "Failed to create table" });
          }
          resolve({ status: 200, message: `Table ${tableName} created successfully` });
        });
      })
      .catch((err) => {
        console.error("Error getting database connection:", err);
        reject({ status: 500, message: "Failed to connect to database" });
      });
  });
};

module.exports = { createExhibitionTable };
