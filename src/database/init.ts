import { core } from "../"
const r = require('rethinkdb')

module.exports = async (database : any) => {
  try {
    core.db.connection = await r.connect(database)
  } catch (e) {
    
    if (e.message.includes('ECONNREFUSED')) {
      console.log("RethinkDB not found")
      process.exit()
    }

  }
}
