const express = require("express")
const { getUser, getUserById } = require("../service/service.user")
const route = express.Router()

route.get("/", async (req, res) => {
    try {
        const user = await getUser()
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

route.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const user = await getUserById(id)
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

route.post()

module.exports = route