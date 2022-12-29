const { getUserDB, getUserByIdDB, createUserDB, updateUserDB, deleteUserDB, patchUserDB } = require("../repository/repository.user")
const ExceptionType = require("../exceptions/exceptions.type")

async function getUser() {
    const user = await getUserDB()
    if (!user.length) throw new Error(ExceptionType.GET_USERS_NOT_FOUND.message)
    return user
}

async function getUserById(user_id) {
    const user = await getUserByIdDB(user_id)
    if (!user.length) throw new Error(ExceptionType.GET_USER_NOT_FOUND.message)
    return user
}

async function createUser(name, surname, birth, city, age) {
    const user = await createUserDB(name, surname, birth, city, age)
    if (!user.length) throw new Error(ExceptionType.POST_USER_NOT_FOUND.message)
    return user
}

async function updateUser(info_id, name, surname, birth, city, age) {
    const user = await updateUserDB(info_id, name, surname, birth, city, age)
    if (!user.length) throw new Error(ExceptionType.PUT_USER_NOT_FOUND.message)
    return user
}

async function deleteUser(info_id) {
    const user = await deleteUserDB(info_id)
    if (!user.length) throw new Error(ExceptionType.DELETE_USER_NOT_FOUND.message)
    return user
}

async function patchUser(info_id, dataFromClient) {
    const user = await patchUserDB(info_id, dataFromClient)
    if (!user.length) throw new Error(ExceptionType.PATCH_USER_NOT_FOUND.message)
    return user
}

module.exports = { getUser, getUserById, createUser, updateUser, deleteUser, patchUser }