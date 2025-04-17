const db = require("../dbConnections");

const DeleteArtwork = async ({ id }) => {
  return new Promise((resolve, reject) => {
    console.log("Attempting to delete artworks for id:", id);

    db.getConnection()
      .then((connection) => {
        connection.query(
          "DELETE FROM artwork WHERE id = ?",
          [id],
          (error, results) => {
            connection.release();

            if (error) {
              console.error("Database query error while deleting artwork:", error);
              return reject({ status: 500, message: "Database query error" });
            }

            if (results.affectedRows === 0) {
              console.log("No artwork found to delete with id:", id);
              return reject({ status: 400, message: "No artwork found with the given id" });
            }

            console.log("Artwork deleted successfully for id:", id);
            resolve({ status: 200, message: "Artwork deleted successfully!" });
          }
        );
      })
      .catch((err) => {
        console.error("Error getting database connection:", err);
        reject({ status: 500, message: "Failed to connect to database" });
      });
  });
};

module.exports = { DeleteArtwork };
