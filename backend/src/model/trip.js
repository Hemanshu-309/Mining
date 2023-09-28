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

const updateTrip = async (id,type) =>{ 
    return knex(table).update({type}).where({id})
}

export default {
    insertTrip,
    getTripDetails,
    getAllTripDetails,
    deleteTrip,
    updateTrip
}