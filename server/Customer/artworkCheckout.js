const db = require('../dbConnections');


const createSoldItemsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS soldItems (
      id INT AUTO_INCREMENT PRIMARY KEY,
      Title VARCHAR(255),
      Type VARCHAR(255),
      Category VARCHAR(255),
      Price DECIMAL(10, 2),
      ArtistName VARCHAR(255),
      Picture VARCHAR(255),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  return new Promise((resolve, reject) => {
    db.getConnection()
      .then((connection) => {
        connection.query(query, (error) => {
          connection.release();

          if (error) {
            console.error('Error creating soldItems table:', error);
            return reject({ status: 500, message: 'Failed to create soldItems table' });
          }

          console.log('soldItems table created or already exists.');
          resolve();
        });
      })
      .catch((err) => {
        console.error('Error getting database connection:', err);
        reject({ status: 500, message: 'Failed to connect to database' });
      });
  });
};


const insertSoldItems = async (soldItems) => {
  await createSoldItemsTable(); 

  return new Promise((resolve, reject) => {
    db.getConnection()
      .then((connection) => {
        const promises = soldItems.map((item) => {
          const { Title, Type, Category, Price, ArtistName, Picture } = item;
          const query = `
            INSERT INTO soldItems (Title, Type, Category, Price, ArtistName, Picture)
            VALUES (?, ?, ?, ?, ?, ?)
          `;

          return new Promise((res, rej) => {
            connection.query(query, [Title, Type, Category, Price, ArtistName, Picture], (error) => {
              if (error) {
                console.error('Database query error while inserting sold item:', error);
                return rej({ status: 500, message: 'Database insert error' });
              }
              res();
            });
          });
        });

        Promise.all(promises)
          .then(() => {
            connection.release();
            resolve({ status: 200, message: 'Sold items inserted successfully!' });
          })
          .catch((err) => {
            connection.release();
            reject(err);
          });
      })
      .catch((err) => {
        console.error('Error getting database connection:', err);
        reject({ status: 500, message: 'Failed to connect to database' });
      });
  });
};

module.exports = { insertSoldItems };
