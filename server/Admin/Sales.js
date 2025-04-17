const db = require("../dbConnections");

const Sales = async () => {
  return new Promise((resolve, reject) => {
    db.getConnection()
      .then((connection) => {
        connection.query(
          "SELECT * FROM solditems",
          (error, results) => {
            connection.release();

            if (error) {
              console.error("Database query error while fetching sold items:", error);
              return reject({ status: 500, message: "Database query error" });
            }

            if (results.length === 0) {
              console.log("No sold items found");
              return reject({ status: 400, message: "No sold items available" });
            }

            resolve({ status: 200, message: "Sold Items Details Fetched!", data: results });
          }
        );
      })
      .catch((err) => {
        console.error("Error getting database connection:", err);
        reject({ status: 500, message: "Failed to connect to database" });
      });
  });
};

module.exports = { Sales };
