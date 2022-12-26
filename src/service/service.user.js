const { getUserDB, getUserByIdDB, createUserDB, updateUserDB, deleteUserDB, patchUserDB } = require("../repository/repository.user")

async function getUser() {
    const user = await getUserDB()
    if (!user.length) throw new Error("not found")
    return user
}

async function getUserById(id) {
    const user = await getUserByIdDB(id)
    if (!user.length) throw new Error("not found")
    return user
}

async function createUser(name, surname, birth, city, age) {
    const user = await createUserDB(name, surname, birth, city, age)
    if (!user.length) throw new Error("not found")
    return user
}

async function updateUser(info_id, name, surname, birth, city, age){
    const user = await updateUserDB(info_id, name, surname, birth, city, age)
    if (!user.length) throw new Error("not found")
    return user
}

async function deleteUser(id){
    const user = await deleteUserDB(id)
    if (!user.length) throw new Error("not found")
    return user
}

async function patchUser(id, dataFromClient){
    const user = await patchUserDB(id, dataFromClient)
    if (!user.length) throw new Error("not found")
    return user
}

module.exports = { getUser, getUserById, createUser, updateUser, deleteUser, patchUser }