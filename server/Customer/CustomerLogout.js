const db = require("../dbConnections");

const logoutCustomer = async ({ username }) => {
    return new Promise((resolve, reject) => {
      console.log("Attempting to logout customer with username:", username);
  
      db.getConnection()
        .then((connection) => {
          connection.query(
            "DELETE FROM customers WHERE username = ?",
            [username],
            (error, results) => {
              connection.release();
  
              if (error) {
                console.error("Database query error while customer logout:", error);
                return reject({ status: 500, message: "Database query error" });
              }
  
              if (results.affectedRows === 0) {
                console.log("No customer found with username:", username);
                return reject({ status: 400, message: "No customer found with the given username" });
              }
  
              console.log("Customer deleted successfully for username:", username);
              resolve({ status: 200, message: "Customer logout successful!" });
            }
          );
        })
        .catch((err) => {
          console.error("Error getting database connection:", err);
          reject({ status: 500, message: "Failed to connect to database" });
        });
    });
  };
  
  module.exports = { logoutCustomer };
  