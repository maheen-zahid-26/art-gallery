const db = require("../dbConnections");
const bcrypt = require('bcryptjs'); 

const CustomerChangePassword = async ({ username, currentPassword, newPassword }) => {
    return new Promise((resolve, reject) => {
        console.log("Fetching password for username:", username);

        db.getConnection()
            .then((connection) => {
                connection.query(
                    "SELECT password FROM customers WHERE username = ?",
                    [username],
                    (error, results) => {
                        if (error) {
                            connection.release();
                            console.error("Database query error while fetching password:", error);
                            return reject({ status: 500, message: "Database query error" });
                        }

                        console.log("Query results:", results); 

                        if (results.length === 0) {
                            connection.release();
                            console.log("No customer found with username:", username);
                            return reject({ status: 404, message: "Customer not found" });
                        }

                        const storedPassword = results[0].password;
                        console.log("Fetched stored password for verification.");

                        const passwordIsValid = bcrypt.compareSync(currentPassword, storedPassword);
                        if (!passwordIsValid) {
                            connection.release();
                            console.log("Current password is incorrect for username:", username);
                            return reject({ status: 401, message: "Current password is incorrect" });
                        }

                        const hashedNewPassword = bcrypt.hashSync(newPassword, 8);


                        connection.query(
                            "UPDATE customers SET password = ? WHERE username = ?",
                            [hashedNewPassword, username],
                            (error) => {
                                connection.release();

                                if (error) {
                                    console.error("Database query error while updating password:", error);
                                    return reject({ status: 500, message: "Database query error while updating password" });
                                }

                                console.log("Password updated successfully for username:", username);
                                resolve({ status: 200, message: "Password changed successfully!" });
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

module.exports = { CustomerChangePassword };
