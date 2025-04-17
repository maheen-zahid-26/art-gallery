
const db = require('../dbConnections');

const getAllArtworksByTypes = (type) => {
  return new Promise((resolve, reject) => {
    console.log("Connecting to database...");
    db.getConnection()
      .then((connection) => {
        console.log("Connected to database. Executing query for type:", type);
        connection.query(
          'SELECT * FROM artwork WHERE Type = ?',
          [type],
          (error, results) => {
            connection.release();

            if (error) {
              console.error('Database query error while fetching artworks by type:', error);
              return reject({ status: 500, message: 'Database query error' });
            }

            console.log("Query results:", results);
            resolve({ status: 200, data: results });
          }
        );
      })
      .catch((err) => {
        console.error('Error getting database connection:', err);
        reject({ status: 500, message: 'Failed to connect to database' });
      });
  });
};

module.exports = { getAllArtworksByTypes };
