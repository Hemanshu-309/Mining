import knex from '../config/mysql_db.js'
const table = 'users_role'

const insertRole = async (data) =>{
    return knex(table).insert(data)
}

const getRoleDetail = async (field) =>{
    return knex(table).select('id','role_name').where(field).andWhere('status',1)
}

const getAllRoleDetail = async (field) =>{
    return knex(table).select('id','role_name','status').orWhere(field)
}

const deleteRole = async (id)=>{
    return knex(table).update('status',2).where(id)
}

const updateRole = async (id,role_name) =>{ 
    return knex(table).update({role_name,"status":1}).where({id})
}

export default {
    insertRole,
    getRoleDetail,
    deleteRole,
    updateRole,
    getAllRoleDetail
}