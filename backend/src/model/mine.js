import knex from '../config/mysql_db.js'
const table = 'mine'

const addMineData = (data)=>{
    return knex(table).insert(data)
}

const getAllMinesData = (field)=>{
    return knex(table).select('*').orWhere(field)
}

const getMineData = (where,status) =>{
    return knex(table).select('*').where(where).orWhere(status)
}

const deleteMine = (id)=>{
    return knex(table).update('status',2).where(id)
}

export default {
    addMineData,
    getAllMinesData,
    getMineData,
    deleteMine
}
