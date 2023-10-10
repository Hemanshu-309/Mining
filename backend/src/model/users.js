import knex from '../config/mysql_db.js'
const table = "users"
const role = "users_role"

const createUser = (data)=>{
    return knex(table).insert(data)
}

const getUserDetail = (field,status) => {
    let rows = knex(table)
    .select(`${table}.id`,`${table}.firstname`,`${table}.lastname`,`${table}.username`,`${table}.email`,`${table}.mobile`,`${role}.role_name as role`)
    .leftJoin(role,`${role}.id`,"=",`${table}.role`)
   
    if (status) rows.where(`${table}.status`,status)

   rows =  rows.where(field)

   return rows
}

const deleteUser = (field)=>{
    return knex(table).update('status',2).where(field)
}

const updateUser = (where,field)=>{
    return knex(table).where(where).update(field)
}

export default {
    createUser,
    getUserDetail,
    deleteUser,
    updateUser
}