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

const getDailyReport = (where, id) => {
  return knex(table)
    .select(
      "id",
      "userid",
      "role",
      "mine_no",
      "vehicle",
      "trip_type",
      "with_lead",
      "trips",
      "quantity",
      "date",
      "remarks"
    )
    .where(where)
    .andWhere("status", 1);
};

const getAllDailyReport = () => {
  return knex(table)
    .select(
      "id",
      "role",
      "mine_no",
      "vehicle",
      "trip_type",
      "with_lead",
      "trips",
      "quantity",
      "date",
      "remarks"
    )
    .andWhere("status", 1);
};

const deleteReport = async (field) => {
  return knex(table).update("status", 2).where(field).andWhere("status", 1);
};

const paginateDailyReport = (
  limit,
  offset,
  sort,
  order
) => {
  let rows = knex(table)
    .select(`${table}.id`, `${userTable}.username`,`${role}.role_name`,`${vehicle}.name`,`${trip}.type`)
    .leftJoin(userTable, `${userTable}.id`, "=", `${table}.userid`)
    .leftJoin(role, `${role}.id`, "=", `${table}.role`)
    .leftJoin(vehicle, `${vehicle}.id`, "=", `${table}.vehicle`)
    .leftJoin(trip, `${trip}.id`, "=", `${table}.trip_type`)
    
  rows = rows.orderBy(sort,order).limit(limit).offset(offset)

  return rows
};

export default {
  insertDailyReport,
  getDailyReport,
  getAllDailyReport,
  deleteReport,
  paginateDailyReport,
};
