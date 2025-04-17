const { createExhibitionTable } = require("../Admin/ExhibitionTable");
const db = require("../dbConnections");

const participateInExhibitionArtist = async (exhibitionName, username) => {
  const tableName = exhibitionName.replace(/\s+/g, "_").toLowerCase();

  await createExhibitionTable(tableName);

  return new Promise((resolve, reject) => {
    db.getConnection()
      .then((connection) => {
        const checkParticipationQuery = `
          SELECT * FROM ${tableName} WHERE username = ?`;

        connection.query(checkParticipationQuery, [username], (checkError, checkResults) => {
          if (checkError) {
            connection.release();
            console.error("Error checking participation:", checkError);
            return reject({ status: 500, message: "Failed to check participation" });
          }

          if (checkResults.length > 0) {
            connection.release();
            return reject({ status: 409, message: "Already participated in this exhibition" });
          }

          const checkArtistQuery = `
            SELECT * FROM artists WHERE username = ?`;

          connection.query(checkArtistQuery, [username], (checkError, checkResults) => {
            if (checkError) {
              connection.release();
              console.error("Error checking artist:", checkError);
              return reject({ status: 500, message: "Failed to check artist" });
            }

            if (checkResults.length === 0) {
              connection.release();
              return reject({ status: 404, message: "Artist not found" });
            }

            const artist = checkResults[0];

            const insertQuery = `
              INSERT INTO ${tableName} (name, username, mobile, email, dateOfBirth, address, city, state, country, photo)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const address = artist.address1 + (artist.address2 ? ' ' + artist.address2 : '');

            connection.query(insertQuery, [
              artist.name,
              artist.username,
              artist.mobile,
              artist.email,
              artist.dob,
              address,
              artist.city,
              artist.state,
              artist.country,
              artist.photo
            ], (insertError) => {
              connection.release();

              if (insertError) {
                console.error("Error adding participation entry:", insertError);
                return reject({ status: 500, message: "Failed to record participation" });
              }

              resolve({ status: 200, message: "Participation recorded successfully!" });
            });
          });
        });
      })
      .catch((err) => {
        console.error("Error getting database connection:", err);
        reject({ status: 500, message: "Failed to connect to database" });
      });
  });
};

module.exports = { participateInExhibitionArtist };
