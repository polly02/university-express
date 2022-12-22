const pool = require("../db")

async function getUserDB() {
    const client = await pool.connect()
    const sql = "SELECT * FROM users JOIN users_info ON users.info_id=users_info.id"
    const data = (await client.query(sql)).rows
    return data
}

async function getUserByIdDB(id) {
    const client = await pool.connect()
    const sql = "SELECT users.id, users.name, users.surname, users_info.birth, users_info.city, users_info.age FROM users JOIN users_info ON users.info_id=users_info.id WHERE users.id = $1"
    const data = (await client.query(sql, [id])).rows
    return data
}

module.exports = { getUserDB, getUserByIdDB }