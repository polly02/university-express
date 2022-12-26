const { query } = require("express")
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

async function createUserDB(name, surname, birth, city, age) {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const sql = "INSERT INTO users_info(birth, city, age) VALUES ($1, $2, $3) RETURNING *"
        const data = (await client.query(sql, [birth, city, age])).rows[0]

        const sql2 = "INSERT INTO users(name, surname, info_id) VALUES ($1, $2, $3)"
        await client.query(sql2, [name, surname, data.id]) // без rows, тк не записываем в переменную


        const sql3 = "SELECT * FROM users JOIN users_info ON users_info.id=users.info_id WHERE users.info_id = $1"
        const data3 = (await client.query(sql3, [data.id])).rows

        await client.query('COMMIT')

        return data3

    } catch (error) {
        await client.query('ROLLBACK')
        console.log(`createUser: ${error.message}`);
        return []
    }
}

async function updateUserDB(id, name, surname, birth, city, age) {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')

        const sql = "UPDATE users_info SET birth=$1, city=$2, age=$3 WHERE id=$4"
        await client.query(sql, [birth, city, age, id])

        const sql2 = "UPDATE users SET name=$1, surname=$2 WHERE id=$3"
        await client.query(sql2, [name, surname, id])

        const sql3 = "SELECT * FROM users JOIN users_info ON users_info.id=users.info_id WHERE users.info_id = $1"
        const data3 = (await client.query(sql3, [id])).rows

        await client.query('COMMIT')

        return data3
    } catch (error) {
        await client.query('ROOLBACK')
        console.log(`updateUser: ${error.message}`)
        return []
    }
}

async function deleteUserDB(id) {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')

        const sql = "DELETE FROM users WHERE info_id=$1"
        await client.query(sql, [id])

        const sql2 = "DELETE FROM users_info WHERE id=$1 RETURNING *"
        const data2 = (await client.query(sql2, [id])).rows

        await client.query('COMMIT')

        return data2
    } catch (error) {
        await client.query('ROLLBACK')
        console.log(`deleteUser: ${error.message}`)
        return []
    }
}

async function patchUserDB(id, dataFromClient) {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')

        const sql = "SELECT * FROM users JOIN users_info ON users_info.id=users.info_id WHERE users.info_id = $1"
        const data = (await client.query(sql, [id])).rows[0]

        const mergeData = { ...data, ...dataFromClient }

        const sql2 = "UPDATE users SET name=$1, surname=$2 WHERE id=$3"
        await client.query(sql2, [mergeData.name, mergeData.surname, id])

        const sql3 = "UPDATE users_info SET birth=$1, city=$2, age=$3 WHERE id=$4"
        await client.query(sql3, [mergeData.birth, mergeData.city, mergeData.age, id])

        const sql4 = "SELECT * FROM users JOIN users_info ON users_info.id=users.info_id WHERE users.info_id = $1"
        const data4 = (await client.query(sql4, [id])).rows

        await client.query('COMMIT')

        return data4
    } catch (error) {
        await client.query('ROLLBACK')
        console.log(`patchUser: ${error.message}`)
        return []
    }
}

module.exports = { getUserDB, getUserByIdDB, createUserDB, updateUserDB, deleteUserDB, patchUserDB }