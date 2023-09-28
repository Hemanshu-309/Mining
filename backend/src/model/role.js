import knex from '../config/mysql_db.js'
const table = 'users_role'

const insertRole = async (data) =>{
    return knex(table).insert(data)
}

const getRoleDetail = async (field) =>{
    return knex(table).select('id','role_name').where(field).andWhere('status',1)
}

export default {
    insertRole,
    getRoleDetail
}