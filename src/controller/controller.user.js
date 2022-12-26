const express = require("express")
const { getUser, getUserById, createUser, updateUser, deleteUser, patchUser } = require("../service/service.user")
const route = express.Router()

route.get("/", async function (req, res) {
    try {
        const user = await getUser()
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

route.get("/:id", async function (req, res) {
    try {
        const { id } = req.params
        const user = await getUserById(id)
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

route.post("/", async function (req, res) {
    try {
        const { name, surname, birth, city, age } = req.body
        const user = await createUser(name, surname, birth, city, age)
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

route.put("/:info_id", async function (req, res) {
    try {
        const { info_id } = req.params
        const { name, surname, birth, city, age } = req.body
        const user = await updateUser(info_id, name, surname, birth, city, age)
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

route.delete("/:info_id", async function (req, res) {
    try {
        const { info_id } = req.params
        const user = await deleteUser(info_id)
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

route.patch("/:info_id", async function (req, res) {
    try {
        const { info_id } = req.params
        const user = await patchUser(info_id, req.body)
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = route