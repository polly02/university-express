const express = require("express")
const { getUser, getUserById, createUser, updateUser, deleteUser, patchUser } = require("../service/service.user")
const { isValidInfoId, isValidUserId, isValidBody } = require("../helper/validation")
const { buildResponse } = require("../helper/buildResponse")
const route = express.Router()

route.get("/", async function (req, res) {
    try {
        const user = await getUser()
        buildResponse(res, 200, user)
    } catch (error) {
        buildResponse(res, 404, error.message)
    }
})

route.get("/:user_id", isValidUserId, async function (req, res) {
    try {
        const { user_id } = req.params
        const user = await getUserById(user_id)
        buildResponse(res, 200, user)
    } catch (error) {
        buildResponse(res, 404, error.message)
    }
})

route.post("/", isValidBody, async function (req, res) {
    try {
        const { name, surname, birth, city, age } = req.body
        const user = await createUser(name, surname, birth, city, age)
        buildResponse(res, 200, user)
    } catch (error) {
        buildResponse(res, 404, error.message)
    }
})

route.put("/:info_id", isValidInfoId, isValidBody, async function (req, res) {
    try {
        const { info_id } = req.params
        const { name, surname, birth, city, age } = req.body
        const user = await updateUser(info_id, name, surname, birth, city, age)
        buildResponse(res, 200, user)
    } catch (error) {
        buildResponse(res, 404, error.message)
    }
})

route.delete("/:info_id", isValidInfoId, async function (req, res) {
    try {
        const { info_id } = req.params
        const user = await deleteUser(info_id)
        buildResponse(res, 200, user)
    } catch (error) {
        buildResponse(res, 404, error.message)
    }
})

route.patch("/:info_id", isValidInfoId, async function (req, res) {
    try {
        const { info_id } = req.params
        const user = await patchUser(info_id, req.body)
        buildResponse(res, 200, user)
    } catch (error) {
        buildResponse(res, 404, error.message)
    }
})

module.exports = route