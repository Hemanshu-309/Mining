import knex from '../config/mysql_db.js'

const table = 'vehicles'

const insertVehicle = async (data)=>{
    return knex(table).insert(data)
}

const getVehicle = async(field)=>{
    return knex(table).select('id','name').where(field)
}

const getAllVehicle = async(field)=>{
    return knex(table).select('id','name','status').orWhere(field)
}

const deleteVehicle = async(id)=>{
    return knex(table).update('status',2).where(id)
}

const updateVehicle = async (id,name) =>{ 
    return knex(table).update({name,"status":1}).where({id})
}

const deletedMultipleVehicle = async(field)=>{
    return knex(table).whereIn('id',field).update('status',2)
}


export default {
    insertVehicle,
    getVehicle,
    getAllVehicle,
    deleteVehicle,
    updateVehicle,
    deletedMultipleVehicle
}