import knex from '../config/mysql_db.js'
const table = "users"

//Rahul's Code
const createUser = (data)=>{
    return knex(table).insert(data)
}

const getUserDetail = (field) => {
    return knex.select("id","firstname","lastname","username","email","status","role",).from(table).where(field)
}

const deleteUser = (field)=>{
    return knex(table).update('status',2).where(field)
}

//Mahima's Code
const UserDetail = (where) => {
    return knex
      .select(
        "id",
        "firstname",
        "lastname",
        "password",
        "username",
        "email",
        "status",
        "role",
        "token"
      )
      .from(table)
      .where(where);
  };

const getUser = (data) => {
    return knex.select("*").from(table).where(data);
  };

const resetpassToken = (email,token) => {
    return knex(table).where({email}).update({token:token})
  }

const updatepass = (email,newHashedPass) => {
    return knex(table)
    .where({email})
    .update({
      password  : newHashedPass 
    })
  }
  
export default {
    createUser,
    getUserDetail,
    deleteUser,
    updatepass,
    resetpassToken,
    getUser,
    UserDetail
}