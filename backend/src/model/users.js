import knex from '../config/mysql_db.js'
const table = "users"

const createUser = (data)=>{
    return knex(table).insert(data)
}

const getUserDetail = (field) => {
    return knex.select("id","firstname","lastname","username","email","status","role",).from(table).where(field)
}

const deleteUser = (field)=>{
    return knex(table).update('status',2).where(field)
}

export default {
    createUser,
    getUserDetail,
    deleteUser
}