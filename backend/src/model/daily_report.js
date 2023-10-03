import knex from '../config/mysql_db.js'

const table = "daily_report"

const insertDailyReport = (data) =>{
    return knex(table).insert(data)
}

const getDailyReport = (where,id) =>{
    return knex(table).select('id','userid','role','mine_no','vehicle','trip_type','with_lead','trips','quantity','date','remarks').where(where).andWhere('status',1)
}

const getAllDailyReport = () =>{
    return knex(table).select('id','role','mine_no','vehicle','trip_type','with_lead','trips','quantity','date','remarks').andWhere('status',1)
}

const deleteReport =async (field) =>{
    return  knex(table).update('status',2).where(field).andWhere('status',1)
}

export default {
    insertDailyReport,
    getDailyReport,
    getAllDailyReport,
    deleteReport
}