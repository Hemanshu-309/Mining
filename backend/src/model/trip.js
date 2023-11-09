import knex from '../config/mysql_db.js';
const table = 'trip_type'

const insertTrip = async (data)=>{
    return knex(table).insert(data)
}

const getTripDetails = async (field) =>{
    return knex(table).select('id','type','status').where(field)
}

const getAllTripDetails = async (data)=>{
    
    return knex(table).select('id','type','status').orWhere(data).orderBy('id','desc')
}

const deleteTrip = async(field)=>{
    return knex(table).delete().where({...field})
}

const deletedMultipleTrip = async(field)=>{
    return knex(table).whereIn('id',field).update('status',2)
}

const updateTrip = async (id,type) =>{ 
    return knex(table).update({type,'status':1}).where({id})
}

const paginateTrip = (limit, offset, sort, order, status, searchFrom, search) =>{
    let rows = knex(table).select(`${table}.id`,`${table}.type as Trip Type`)

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

const paginateTripTotal = async(searchFrom,search,status) => {
    let rows = knex(table).select(`${table}.id`,`${table}.type as Trip Type`)

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
    insertTrip,
    getTripDetails,
    getAllTripDetails,
    deleteTrip,
    updateTrip,
    deletedMultipleTrip,
    paginateTrip,
    paginateTripTotal
}