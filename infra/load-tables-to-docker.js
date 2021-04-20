import fs from 'fs'

import pgConnect from '../src/lib/postgres'

;(() => {
  fs.readFile(`${__dirname}/create-tables.sql`, (err, data) => {
    if (err) throw err
    const parsedData = data.toString()
    const pgConnection = pgConnect()
    pgConnection
      .query(parsedData)
      .then((res) => {
        console.log(res)
        console.log('DONE')
      })
      .catch((ex) => {
        throw ex
      })
  })
})()
