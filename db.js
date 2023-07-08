const { Client } = require("pg")

const pool = new Client({
    user: "postgres",
    host: "localhost",
    database: "oquv",
    password: "abbas123",
    port: 5432
})
pool.connect(err => {
    if(err) {
        console.log("Connect Error");
    } else {
        console.log("Connect To PostgreSql");
    }
})

module.exports = pool