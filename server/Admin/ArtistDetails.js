const db = require("../dbConnections");

const ArtistDetails = async () => {
  return new Promise((resolve, reject) => {
    db.getConnection()
      .then((connection) => {
        connection.query(
          "SELECT * FROM artists",
          (error, results) => {
            connection.release();

            if (error) {
              console.error("Database query error while fetching artists:", error);
              return reject({ status: 500, message: "Database query error" });
            }

            if (results.length === 0) {
              console.log("No artists found");
              return reject({ status: 400, message: "No artists available" });
            }

            resolve({ status: 200, message: "Artist Details Fetched!", data: results });
          }
        );
      })
      .catch((err) => {
        console.error("Error getting database connection:", err);
        reject({ status: 500, message: "Failed to connect to database" });
      });
  });
};

module.exports = { ArtistDetails };
