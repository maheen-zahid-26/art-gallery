const db = require("../dbConnections");

const fetchArtworksByUsername = async ({ username }) => {
    console.log(username);
  return new Promise((resolve, reject) => {
    console.log("Fetching artwork details for username:", username);

    db.getConnection()
      .then((connection) => {
        connection.query(
          "SELECT id FROM artists WHERE username = ?",
          [username],
          (error, results) => {
            if (error) {
              connection.release();
              console.error("Database query error while fetching artist ID:", error);
              return reject({ status: 500, message: "Database query error" });
            }

            if (results.length === 0) {
              connection.release();
              console.log("No artist found with username:", username);
              return reject({ status: 404, message: "Artist not found" });
            }

            const artistId = results[0].id;
            console.log("Fetched artist ID:", artistId);

            connection.query(
              "SELECT * FROM artwork WHERE ArtistId = ?",
              [artistId],
              (error, artworkResults) => {
                connection.release();

                if (error) {
                  console.error("Database query error while fetching artworks:", error);
                  return reject({ status: 500, message: "Database query error while fetching artworks" });
                }

                if (artworkResults.length === 0) {
                  console.log("No artworks found for artist ID:", artistId);
                  return resolve({ status: 404, message: "No artworks found", data: [] });
                }

                console.log("Fetched artworks:", artworkResults);
                resolve({
                  status: 200,
                  message: "Artworks Fetched Successfully!",
                  data: artworkResults,
                });
              }
            );
          }
        );
      })
      .catch((err) => {
        console.error("Error getting database connection:", err);
        reject({ status: 500, message: "Failed to connect to database" });
      });
  });
};

module.exports = { fetchArtworksByUsername };
