import knex from '../config/mysql_db.js';
const table = 'trip_type'

const insertTrip = async (data)=>{
    return knex(table).insert(data)
}

const getTripDetails = async (field) =>{
    return knex(table).select('id','type').where(field)
}

const getAllTripDetails = async ()=>{
    return knex(table).select('id','type').where('status',1)
}

const deleteTrip = async(field)=>{
    return knex(table).update('status',2).where(field)
}

const deletedMultipleTrip = async(field)=>{
    return knex(table).whereIn('id',field).update('status',2)
}

const updateTrip = async (id,type) =>{ 
    return knex(table).update({type,'status':1}).where({id})
}

export default {
    insertTrip,
    getTripDetails,
    getAllTripDetails,
    deleteTrip,
    updateTrip,
    deletedMultipleTrip
}