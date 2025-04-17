const db = require("../dbConnections");


const logoutArtist = async ({ username }) => {
    return new Promise((resolve, reject) => {
      console.log("Attempting to logout artist with username:", username);
  
      db.getConnection()
        .then((connection) => {
          connection.query(
            "DELETE FROM artists WHERE username = ?",
            [username],
            (error, results) => {
              connection.release();
  
              if (error) {
                console.error("Database query error while artist logout:", error);
                return reject({ status: 500, message: "Database query error" });
              }
  
              if (results.affectedRows === 0) {
                console.log("No artist found with username:", username);
                return reject({ status: 400, message: "No artist found with the given username" });
              }
  
              console.log("Artist deleted successfully for username:", username);
              resolve({ status: 200, message: "Artist logout successful!" });
            }
          );
        })
        .catch((err) => {
          console.error("Error getting database connection:", err);
          reject({ status: 500, message: "Failed to connect to database" });
        });
    });
  };
  
  module.exports = { logoutArtist };
  