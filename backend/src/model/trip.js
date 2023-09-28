import knex from '../config/mysql_db.js';
const table = 'trip_type'

const insertTrip = async (data)=>{
    return knex(table).insert(data)
}

const getTripDetails = async (field) =>{
    return knex(table).select('id','type').where(field)
}

const getAllTripDetails = async ()=>{
    return knex(table).select('id','type')
}
export default {
    insertTrip,
    getTripDetails,
    getAllTripDetails
}