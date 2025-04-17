const { createExhibitionTable } = require("../Admin/ExhibitionTable");
const db = require("../dbConnections");

const participateInExhibition = async (exhibitionName, username) => {
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

  
          const fetchCustomerQuery = `SELECT * FROM customers WHERE username = ?`;
          
          connection.query(fetchCustomerQuery, [username], (error, results) => {
            if (error) {
              connection.release();
              console.error("Error fetching customer details:", error);
              return reject({ status: 500, message: "Failed to fetch customer details" });
            }

            if (results.length === 0) {
              connection.release();
              return reject({ status: 404, message: "Customer not found" });
            }

            const customer = results[0];

            const insertQuery = `
              INSERT INTO ${tableName} (name, username, mobile, email, dateOfBirth, address, city, state, country, photo)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

              const address = customer.address1 + (customer.address2 ? ' ' + customer.address2 : '');

            connection.query(
              insertQuery,
              [
                customer.name,
                customer.username,
                customer.mobile,
                customer.email,
                customer.dob,
                address,
                customer.city,
                customer.state,
                customer.country,
                customer.photo
              ],
              (insertError) => {
                connection.release();

                if (insertError) {
                  console.error("Error adding participation entry:", insertError);
                  return reject({ status: 500, message: "Failed to record participation" });
                }
                resolve({ status: 200, message: "Participation recorded successfully!" });
              }
            );
          });
        });
      })
      .catch((err) => {
        console.error("Error getting database connection:", err);
        reject({ status: 500, message: "Failed to connect to database" });
      });
  });
};

module.exports = { participateInExhibition };
