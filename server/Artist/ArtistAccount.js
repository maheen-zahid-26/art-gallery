const db = require("../dbConnections");

const ArtistMyAccount = async ({ username }) => {
  return new Promise((resolve, reject) => {
    console.log("Fetching details for username:", username);

    db.getConnection()
      .then((connection) => {
        connection.query(
          "SELECT * FROM artists WHERE username = ?",
          [username],
          (error, results) => {
            connection.release();

            if (error) {
              console.error("Database query error while fetching artist:", error);
              return reject({ status: 500, message: "Database query error" });
            }

            if (results.length === 0) {
              console.log("No artist found with username:", username);
              return reject({ status: 400, message: "Invalid username" });
            }

            resolve({ status: 200, message: "Artist Details Fetched!", data: results[0] });
          }
        );
      })
      .catch((err) => {
        console.error("Error getting database connection:", err);
        reject({ status: 500, message: "Failed to connect to database" });
      });
  });
};

module.exports = { ArtistMyAccount };
