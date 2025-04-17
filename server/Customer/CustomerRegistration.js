const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const dbConfig = require("../dbConfig");
const createTable = require("./CustomerTable");
const db = require("../dbConnections");

createTable();

async function registerCustomer(data) {
    console.log("Received data for registration:", data);

    const {
        name = null,
        username = null,
        password = null,
        mobile = null,
        email = null,
        dob = null,
        address1 = null,
        address2 = null,
        city = null,
        state = null,
        country = null,
        photo = null 
    } = data;

    if (!password) {
        console.error("Password is required for registration.");
        throw { status: 400, message: "Password is required for registration." };
    }

    try {
        const connection = await mysql.createConnection(dbConfig).promise();

        console.log("Checking if username exists...");
        const [rows] = await connection.execute("SELECT * FROM customers WHERE username = ?", [username]);

        if (rows.length > 0) {
            throw { status: 400, message: "Username already exists." };
        }

    
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertQuery = `
            INSERT INTO customers (name, username, password, mobile, email, dob, address1, address2, city, state, country, photo)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [name, username, hashedPassword, mobile, email, dob, address1, address2, city, state, country, photo];

        await connection.execute(insertQuery, values);
        await connection.end();

        console.log("Customer registration successful.");
        return { status: 201, message: "Registration successful!" };
    } catch (error) {
        console.error("Database error:", error);
        throw { status: 500, message: "Failed to register customer." };
    }
}


const loginCustomer = async (credentials) => {
    const { username, password } = credentials;

    return new Promise((resolve, reject) => {
        console.log("Login attempt for username:", username); 

        db.getConnection()
            .then((connection) => {
                connection.query(
                    "SELECT * FROM customers WHERE username = ?",
                    [username],
                    async (error, results) => {
                        connection.release(); 

                        if (error) {
                            console.error("Database query error:", error);
                            return reject({ status: 500, message: "Database query error" });
                        }

                        if (results.length === 0) {
                            console.log("No customer found with username:", username); 
                            return reject({ status: 400, message: "Invalid username or password" });
                        }

                        const customer = results[0]; 
                        const isMatch = await bcrypt.compare(password, customer.password); 

                        console.log("Password match result:", isMatch);
                        if (!isMatch) {
                            return reject({ status: 400, message: "Invalid username or password" });
                        }

                        resolve({ status: 200, message: "Login successful!" });
                    }
                );
            })
            .catch((err) => {
                console.error("Error getting database connection:", err);
                reject({ status: 500, message: "Failed to connect to database" });
            });
    });
};

module.exports = { registerCustomer, loginCustomer };
