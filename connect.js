const mysql = require("mysql2/promise")


module.exports = async () => {
    const connection = await mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"minipit"

    })

    return connection
}