const { getUserDB, getUserByIdDB } = require("../repository/repository.user")

async function getUser() {
    const user = await getUserDB()
    if (!user.length) throw new Error("not found")
    return user
}

async function getUserById(id){
    const user = await getUserByIdDB(id)
    if (!user.length) throw new Error("not found")
    return user
}

module.exports = { getUser, getUserById }