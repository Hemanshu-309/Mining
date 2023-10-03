import knex from '../config/mysql_db.js'

const table = "daily_report"

const insertDailyReport = (data) =>{
    return knex(table).insert(data)
}

const getDailyReport = (where,id) =>{
    return knex(table).select('id','userid','role','mine_no','vehicle','trip_type','with_lead','trips','quantity','date','remarks').where(where)
}

const getAllDailyReport = () =>{
    return knex(table).select('id','role','mine_no','vehicle','trip_type','with_lead','trips','quantity','date','remarks')
}

export default {
    insertDailyReport,
    getDailyReport,
    getAllDailyReport
}