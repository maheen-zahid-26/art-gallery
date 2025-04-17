const db = require('../dbConnections');

const getArtwork = async () => {
  return new Promise((resolve, reject) => {
    db.getConnection()
      .then((connection) => {
        connection.query(
          'SELECT * FROM artwork',
          (error, results) => {
            connection.release();

            if (error) {
              console.error('Database query error while fetching artworks:', error);
              return reject({ status: 500, message: 'Database query error' });
            }

            resolve({ status: 200, message: 'Artworks fetched successfully!', data: results });
          }
        );
      })
      .catch((err) => {
        console.error('Error getting database connection:', err);
        reject({ status: 500, message: 'Failed to connect to database' });
      });
  });
};

module.exports = { getArtwork };