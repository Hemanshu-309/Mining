import knex from '../config/mysql_db.js'
const table = 'users_role'

const insertRole = async (data) =>{
    return knex(table).insert(data)
}

const getRoleDetail = async (field) =>{
    return knex(table).select('id','role_name','status').where(field).andWhere('status',1)
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

const deletedMultipleRoles = async(field)=>{
    return knex(table).whereIn('id',field).update('status',2)
}

const paginateRole = (limit, offset, sort, order, status, searchFrom, search) =>{
    let rows = knex(table).select(`${table}.id`,`${table}.role_name as Role`)

    if (status) rows.where(`${table}.status`,`${status}`) 

    rows = rows.where((query)=>{
        if(search){
          searchFrom.map(val =>{
            query.orWhereILike(val, `%${search}%`)
          })
        }
    })

  rows = rows.orderBy(sort,order).limit(limit).offset(offset)

  return rows
}

const paginateRoleTotal = async(searchFrom,search,status) => {
    let rows = knex(table).select(`${table}.id`,`${table}.role_name as Role`)

    if (status) rows.where(`${table}.status`,`${status}`) 

    rows = rows.where((query)=>{
        if(search){
          searchFrom.map(val =>{
            query.orWhereILike(val, `%${search}%`)
          })
        }
    })

    const total = await rows.count(`${table}.id as total`).first()
    return total
}


export default {
    insertRole,
    getRoleDetail,
    deleteRole,
    updateRole,
    getAllRoleDetail,
    deletedMultipleRoles,
    paginateRole,
    paginateRoleTotal
}