
const mysql = require('mysql2');


const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "0827",
    database: "naam"
});


module.exports = {
    getConnection: () => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) return reject(err);
                resolve(connection);
            });
        });
    }
};

