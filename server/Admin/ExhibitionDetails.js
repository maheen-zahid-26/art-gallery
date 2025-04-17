const db = require("../dbConnections");

const ExhibitionDetails = async (exhibitionName) => {
  const validExhibitions = new Set(["painting_exhibit", "annual_art_exhibition", "art_exhibit", "art_exhibition"]);
  

  if (!validExhibitions.has(exhibitionName)) {
    return Promise.reject({ status: 400, message: "Invalid exhibition name" });
  }

  return new Promise((resolve, reject) => {
    db.getConnection()
      .then((connection) => {

        const query = `SELECT * FROM ${exhibitionName}`;

        connection.query(query, (error, results) => {
          connection.release();

          if (error) {
            console.error("Database query error while fetching participants:", error);
            return reject({ status: 500, message: "Database query error" });
          }

          if (results.length === 0) {
            console.log(`No participants found for exhibition: ${exhibitionName}`);
            return resolve({ status: 404, message: "No participants found", data: [] });
          }

          resolve({ status: 200, message: "Exhibition details fetched!", data: results });
        });
      })
      .catch((err) => {
        console.error("Error getting database connection:", err);
        reject({ status: 500, message: "Failed to connect to database" });
      });
  });
};

module.exports = { ExhibitionDetails };
