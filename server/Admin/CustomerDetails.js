const db = require("../dbConnections");

const CustomerDetails = async () => {
  return new Promise((resolve, reject) => {
    db.getConnection()
      .then((connection) => {
        connection.query(
          "SELECT * FROM customers",
          (error, results) => {
            connection.release();

            if (error) {
              console.error("Database query error while fetching customers:", error);
              return reject({ status: 500, message: "Database query error" });
            }

            if (results.length === 0) {
              console.log("No customers found");
              return reject({ status: 400, message: "Invalid" });
            }

            resolve({ status: 200, message: "Customer Details Fetched!", data: results });
          }
        );
      })
      .catch((err) => {
        console.error("Error getting database connection:", err);
        reject({ status: 500, message: "Failed to connect to database" });
      });
  });
};

module.exports = { CustomerDetails };
