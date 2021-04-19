const { Sequelize } = require(`sequelize`)
const pg = require('pg')

pg.defaults.parseInt8 = true

const env = process.env.NODE_ENV || 'development'
/**
 * @type {{
 *   host: string,
 *   database: string,
 *   username: string,
 *   password: string,
 *   port: number
 * }}
 */
const config = require('../config/config')[env]

module.exports = () => {
  const settings = {
    host: config.host,
    database: config.database,
    username: config.username,
    password: config.password,
    port: config.port || 5432,
    dialect: `postgres`,
    define: {
      timestamps: false
    }
  }
  return new Sequelize(settings)
}
