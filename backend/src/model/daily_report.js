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

const updateDailyReport = (data, id) => {
  return knex(table).update(data).where(id);
};

const getDailyReport = (id, userid) => {
  let rows = knex(table)
    .select(
      `${table}.id`,
      `${userTable}.username`,
      `${role}.role_name as role`,
      `${vehicle}.name as vehicle`,
      `${trip}.type as trip_type`,
      `${mine}.mine_name as mine_name`,
      `${table}.with_lead as with_lead`,
      `${table}.trips`,
      `${table}.quantity`,
      `${table}.rate`,
      `${table}.amount`,
      `${table}.date`,
      `${table}.remarks`
    )
    .leftJoin(userTable, `${userTable}.id`, "=", `${table}.userid`)
    .leftJoin(role, `${role}.id`, "=", `${table}.role_id`)
    .leftJoin(vehicle, `${vehicle}.id`, "=", `${table}.vehicle`)
    .leftJoin(trip, `${trip}.id`, "=", `${table}.trip_type`)
    .leftJoin(mine, `${mine}.id`, "=", `${table}.mine_no`);

  if (id) {
    rows = rows.where(`${table}.id`, id)
    if(userid){
      rows = rows
      .where(`${table}.status`, 1)
      .andWhere(`${table}.userid`, userid)
      .orWhere(`${table}.id`, id);
    }
  }

  if(userid){
    rows = rows
    .where(`${table}.status`, 1)
    .andWhere(`${table}.userid`, userid)
    .orWhere(`${table}.id`, id);
  }
  


  return rows;
};

const getAllDailyReport = () => {
  let rows = knex(table)
    .select(
      `${table}.id`,
      `${userTable}.username`,
      `${role}.role_name as role`,
      `${vehicle}.name as vehicle`,
      `${trip}.type as trip_type`,
      `${mine}.mine_name as mine_name`,
      `${table}.with_lead as with_lead`,
      `${table}.trips`,
      `${table}.quantity`,
      `${table}.rate`,
      `${table}.amount`,
      `${table}.date`,
      `${table}.remarks`
    )
    .leftJoin(userTable, `${userTable}.id`, "=", `${table}.userid`)
    .leftJoin(role, `${role}.id`, "=", `${table}.role_id`)
    .leftJoin(vehicle, `${vehicle}.id`, "=", `${table}.vehicle`)
    .leftJoin(trip, `${trip}.id`, "=", `${table}.trip_type`)
    .leftJoin(mine, `${mine}.id`, "=", `${table}.mine_no`);

  rows = rows.where(`${table}.status`, 1);

  return rows.orderBy(`${table}.id`,'desc');
};

const deleteReport = async (field) => {
  return knex(table).update("status", 2).where(field).andWhere("status", 1);
};

const paginateDailyReport = async (
  limit,
  offset,
  sort,
  order,
  status,
  searchFrom,
  search,
  id,
  userid,
  date1,
  date2
) => {
  let rows = knex(table)
    .select(
      `${table}.id`,
      `${userTable}.username`,
      `${role}.role_name as role`,
      `${vehicle}.name as vehicle`,
      `${trip}.type as trip_type`,
      `${mine}.mine_name as mine_name`,
      `${table}.with_lead as with_lead`,
      `${table}.trips`,
      `${table}.quantity`,
      `${table}.rate`,
      `${table}.amount`,
      `${table}.date`,
      `${table}.remarks`
    )
    .leftJoin(userTable, `${userTable}.id`, "=", `${table}.userid`)
    .leftJoin(role, `${role}.id`, "=", `${table}.role_id`)
    .leftJoin(vehicle, `${vehicle}.id`, "=", `${table}.vehicle`)
    .leftJoin(trip, `${trip}.id`, "=", `${table}.trip_type`)
    .leftJoin(mine, `${mine}.id`, "=", `${table}.mine_no`);

  if (status) rows = rows.where(`${table}.status`, `${status}`);

  if (date1 && date2) {
    date2 = new Date(date2 + "T00:00:00Z"); // Use 'T00:00:00Z' to set the time to midnight in UTC
    date2.setDate(date2.getDate() + 1); // Added 1 date above the get data from user's choice
    rows = rows.whereBetween(`${table}.date`, [
      new Date(date1 + "T00:00:00Z"),
      date2,
    ]);
    limit = (await rows).length;
  }

  if (id && userid) {
    rows = rows
      .where(`${table}.id`, `${id}`)
      .andWhere(`${userTable}.id`, `${userid}`);
    return rows;
  }

  rows = rows.where((query) => {
    if (search) {
      searchFrom.map((val) => {
        query.orWhereILike(val, `%${search}%`);
      });
    }
  });

  rows = rows.orderBy(sort, order).limit(limit).offset(offset);

  return rows;
};

const paginateDailyReportTotal = async (
  limit,
  searchFrom,
  search,
  status,
  date1,
  date2
) => {
  let results = knex(table)
    .leftJoin(userTable, `${userTable}.id`, "=", `${table}.userid`)
    .leftJoin(role, `${role}.id`, "=", `${table}.role_id`)
    .leftJoin(vehicle, `${vehicle}.id`, "=", `${table}.vehicle`)
    .leftJoin(trip, `${trip}.id`, "=", `${table}.trip_type`)
    .leftJoin(mine, `${mine}.id`, "=", `${table}.mine_no`)
    .limit(limit);

  if (date1 && date2) {
    date2 = new Date(date2 + "T00:00:00Z"); // Use 'T00:00:00Z' to set the time to midnight in UTC
    date2.setDate(date2.getDate() + 1); // Added 1 date above the get data from user's choice
    results = results.whereBetween(`${table}.date`, [
      new Date(date1 + "T00:00:00Z"),
      date2,
    ]);
  }

  if (status) results = results.where("status", status);

  results = results.where((query) => {
    if (search) {
      searchFrom.map((val) => {
        query.orWhereILike(val, `%${search}%`);
      });
    }
  });

  const total = (await results).length;
  return total;
};

export default {
  insertDailyReport,
  getDailyReport,
  getAllDailyReport,
  deleteReport,
  paginateDailyReport,
  paginateDailyReportTotal,
  updateDailyReport,
};
