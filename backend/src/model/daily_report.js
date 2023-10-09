import knex from "../config/mysql_db.js";

const table = "daily_report";
const userTable = "users";
const trip = "trip_type";
const role = "users_role";
const vehicle = "vehicles";
const mine = "mine";

const insertDailyReport = (data) => {
  return knex(table).insert(data);
};

const getDailyReport = (id,userid) => {
  let rows = knex(table)
    .select(`${table}.id`, `${userTable}.username`,`${role}.role_name as role`,`${vehicle}.name as vehicle`,`${trip}.type as trip type`,`${mine}.mine_name as mine name`,`${table}.with_lead as with lead`,`${table}.trips`,`${table}.quantity`,`${table}.rate`,`${table}.amount`,`${table}.date`,`${table}.remarks`)
    .leftJoin(userTable, `${userTable}.id`, "=", `${table}.userid`)
    .leftJoin(role, `${role}.id`, "=", `${table}.role_id`)
    .leftJoin(vehicle, `${vehicle}.id`, "=", `${table}.vehicle`)
    .leftJoin(trip, `${trip}.id`, "=", `${table}.trip_type`)
    .leftJoin(mine, `${mine}.id`,"=",`${table}.mine_no`)
    
    rows = rows.where(`${table}.status`,1).andWhere(`${table}.id`,id).andWhere(`${table}.userid`,userid)

    return rows

};

const getAllDailyReport = () => {
  let rows = knex(table)
    .select(`${table}.id`, `${userTable}.username`,`${role}.role_name as role`,`${vehicle}.name as vehicle`,`${trip}.type as trip type`,`${mine}.mine_name as mine name`,`${table}.with_lead as with lead`,`${table}.trips`,`${table}.quantity`,`${table}.rate`,`${table}.amount`,`${table}.date`,`${table}.remarks`)
    .leftJoin(userTable, `${userTable}.id`, "=", `${table}.userid`)
    .leftJoin(role, `${role}.id`, "=", `${table}.role_id`)
    .leftJoin(vehicle, `${vehicle}.id`, "=", `${table}.vehicle`)
    .leftJoin(trip, `${trip}.id`, "=", `${table}.trip_type`)
    .leftJoin(mine, `${mine}.id`,"=",`${table}.mine_no`)
    
    rows = rows.where(`${table}.status`,1)

    return rows

};

const deleteReport = async (field) => {
  return knex(table).update("status", 2).where(field).andWhere("status", 1);
};

const paginateDailyReport = ( limit, offset, sort, order,status,searchFrom,search) => {
  let rows = knex(table)
    .select(`${table}.id`, `${userTable}.username`,`${role}.role_name as role`,`${vehicle}.name as vehicle`,`${trip}.type as trip type`,`${mine}.mine_name as mine name`,`${table}.with_lead as with lead`,`${table}.trips`,`${table}.quantity`,`${table}.rate`,`${table}.amount`,`${table}.date`,`${table}.remarks`)
    .leftJoin(userTable, `${userTable}.id`, "=", `${table}.userid`)
    .leftJoin(role, `${role}.id`, "=", `${table}.role_id`)
    .leftJoin(vehicle, `${vehicle}.id`, "=", `${table}.vehicle`)
    .leftJoin(trip, `${trip}.id`, "=", `${table}.trip_type`)
    .leftJoin(mine, `${mine}.id`,"=",`${table}.mine_no`)
    
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
};

const paginateDailyReportTotal = async(searchFrom, search, status) =>{
  let results = knex(table)
  .leftJoin(userTable, `${userTable}.id`, "=", `${table}.userid`)
    .leftJoin(role, `${role}.id`, "=", `${table}.role_id`)
    .leftJoin(vehicle, `${vehicle}.id`, "=", `${table}.vehicle`)
    .leftJoin(trip, `${trip}.id`, "=", `${table}.trip_type`)
    .leftJoin(mine, `${mine}.id`,"=",`${table}.mine_no`)
    
    if (status) results = results.where("status", status)
    
    results = results.where((query) => {
        if (search) {
            searchFrom.map(val => {
                query.orWhereILike(val, `%${search}%`)
            })
        }
    })
    const total = await results.count(`${table}.id as total`).first()
    return total
}

export default {
  insertDailyReport,
  getDailyReport,
  getAllDailyReport,
  deleteReport,
  paginateDailyReport,
  paginateDailyReportTotal
};
