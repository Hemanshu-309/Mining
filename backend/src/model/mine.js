import knex from '../config/mysql_db.js'
const table = 'mine'

const addMineData = (data)=>{
    return knex(table).insert(data)
}

const getAllMinesData = (field)=>{
    return knex(table).select('*').orWhere(field).orderBy('id','desc')
    
}

const getMineData =async (where,status) =>{
    return knex(table).select('*').where(where).orWhere(status)
    
}

const deleteMine = (id)=>{
    return knex(table).delete().where(id)
}

const updateMine = (where,data) =>{
  return knex(table).update(data).where(where)
}

const deletedMultipleMines = async(field)=>{
    return knex(table).whereIn('id',field).delete()
}

const paginateMines = (limit, offset, sort, order, status, searchFrom, search) =>{
    let rows = knex(table).select('*')

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
}

const paginateMineTotal = async(searchFrom,search,status) => {
    let rows = knex(table).select('*')

    if (status) rows.where(`${table}.status`,`${status}`) 

    rows = rows.where((query)=>{
        if(search){
          searchFrom.map(val =>{
            query.orWhereILike(val, `%${search}%`)
          })
        }
    })

    const total = await rows.count(`${table}.id as total`).first()
    return total
}

export default {
    addMineData,
    getAllMinesData,
    getMineData,
    deleteMine,
    deletedMultipleMines,
    paginateMines,
    paginateMineTotal,
    updateMine
}
