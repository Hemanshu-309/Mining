import knex from '../config/mysql_db.js'

const table = 'vehicles'

const insertVehicle = async (data)=>{
    return knex(table).insert(data)
}

const getVehicle = async(field)=>{
    return knex(table).select('id','name').where(field)
}

const getAllVehicle = async(field)=>{
    return knex(table).select('id','name','status').orWhere(field).orderBy('id','desc')
}

const deleteVehicle = async(id)=>{
    return knex(table).delete().where(id)
}

const updateVehicle = async (id,name) =>{ 
    return knex(table).update({name,"status":1}).where({id})
}

const deletedMultipleVehicle = async(field)=>{
    return knex(table).whereIn('id',field).delete()
}

const paginateVehicle = (limit, offset, sort, order, status, searchFrom, search) =>{
    let rows = knex(table).select(`${table}.id`,`${table}.name as Vehicle Name`)

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

const paginateVehicleTotal = async(searchFrom,search,status) => {
    let rows = knex(table).select(`${table}.id`,`${table}.name as Vehicle Name`)

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
    insertVehicle,
    getVehicle,
    getAllVehicle,
    deleteVehicle,
    updateVehicle,
    deletedMultipleVehicle,
    paginateVehicle,
    paginateVehicleTotal
}