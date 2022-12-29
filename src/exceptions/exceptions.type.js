const ExceptionType = {
    GET_USER_NOT_FOUND: { id: 1, message: "getUserById: this user is not defind." },
    GET_USERS_NOT_FOUND: { id: 2, message: "getUser: this user is not defind." },
    POST_USER_NOT_FOUND: { id: 3, message: "createUser: this user is not defind." },
    PUT_USER_NOT_FOUND: { id: 4, message: "updateUser: this user is not defind." },
    DELETE_USER_NOT_FOUND: { id: 5, message: "deleteUser: this user is not defind." },
    PATCH_USER_NOT_FOUND: { id: 6, message: "pathUser: this user is not defind." },
    ID_NOT_FOUND: { id: 7, message: "This id is empty." },
    ID_NOT_VALID: { id: 8, message: "This id is not valid." },
    NAME_NOT_FOUND: { id: 9, message: "This name is empty." },
    SURNAME_NOT_FOUND: { id: 10, message: "This surname is empty." },
    BIRTH_NOT_FOUND: { id: 11, message: "This birth is empty." },
    BIRTH_NOT_VALID: { id: 12, message: "This birth is not valid." },
    CITY_NOT_FOUND: { id: 13, message: "This city is empty." },
    AGE_NOT_FOUND: { id: 14, message: "This age is empty." },
    AGE_NOT_VALID: { id: 15, message: "This age is not valid." },
}

module.exports = ExceptionType