import knex from '../config/mysql_db.js'
const table = "users"
const role = "users_role"

const createUser = (data)=>{
    return knex(table).insert(data)
}

const getUserDetail = (field,status,where) => {
    let rows = knex(table)
    .select(`${table}.id`,`${table}.firstname`,`${table}.password`,`${table}.lastname`,`${table}.username`,`${table}.email`,`${table}.mobile`,`${table}.status`,`${role}.role_name as role`)
    .leftJoin(role,`${role}.id`,"=",`${table}.role`)

    const key = Object.keys(where)
    const value = Object.values(where)

    if(where) {rows = rows.where(`${table}.${key[0]}`,value[0])}
    if (status) {rows.where(`${table}.status`,status)}
    if(field) {rows =  rows.where(`${table}.id`,field.id)}
    

   return rows
}

const getAllUserDetails = (status,where)=>{
  let rows = knex(table)
  .select(`${table}.id`,`${table}.firstname`,`${table}.lastname`,`${table}.username`,`${table}.email`,`${table}.mobile`,`${table}.status`,`${role}.role_name as role`)
  .leftJoin(role,`${role}.id`,"=",`${table}.role`)
 
  if (status) rows.where(`${table}.status`,status)

 if(where) rows.where(where)

 return rows.orderBy(`${table}.id`,'desc')
}

const checkUser = (field,status)=>{
  let rows = knex(table).select('*')
   
   
    if (status) rows.where(`${table}.status`,status)

   rows =  rows.where(field)

   return rows
}

const deleteUser = (field)=>{
    return knex(table).delete().where({...field})
}

const updateUser = (where,field)=>{
    return knex(table).where(where).update(field)
}

const paginateUser = (limit, offset, sort, order, status, searchFrom, search) =>{
    let rows = knex(table)
    .select(`${table}.id`,`${table}.firstname`,`${table}.lastname`,`${table}.email`,`${table}.mobile`,`${table}.code`,`${role}.role_name as role`)
    .leftJoin(role,`${role}.id`,"=",`${table}.role`)

    if (status) rows.where(`${table}.status`,status)

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

const paginateUserTotal = async(searchFrom, search, status) =>{
    let rows = knex(table)
    .select(`${table}.id`,`${table}.firstname`,`${table}.lastname`,`${table}.mobile`,`${table}.code`,`${table}.status`,`${role}.role_name as role`)
    .leftJoin(role,`${role}.id`,"=",`${table}.role`)

    if (status) rows.where(`${table}.status`,status)

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
    createUser,
    getUserDetail,
    deleteUser,
    updateUser,
    paginateUser,
    paginateUserTotal,
    checkUser,
    getAllUserDetails
}