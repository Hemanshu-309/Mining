import knex from '../config/mysql_db.js'

const table = "daily_report"

const insertDailyReport = (data) =>{
    return knex(table).insert(data)
}

export default {
    insertDailyReport
}