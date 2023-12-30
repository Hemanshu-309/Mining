import knex from 'knex'
import config from '../helpers/constant.js'

export default knex({
    client: 'mysql',
    connection: {
      host: config.dbconfig.host,
      port: config.dbconfig.port,
      user: config.dbconfig.user,
      password: config.dbconfig.password,
      database: config.dbconfig.database
    }
  })

