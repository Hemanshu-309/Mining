import knex from '../config/mysql_db.js'
const table = "users"

const createUser = (data)=>{
    return knex(table).insert(data)
}

const getUserDetail = (field) => {
    return knex(table).select("id","firstname","lastname","email","status").where(field)
}

export default {
    createUser,
    getUserDetail
}