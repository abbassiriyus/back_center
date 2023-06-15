const { Client } = require("pg")

const pool = new Client({
    user: "postgres",
    host: "containers-us-west-159.railway.app",
    database: "railway",
    password: "GwsMhPk8uhAC5538ZpBO",
    port: 6446
})

pool.connect(err => {
    if(err) {
        console.log("Connect Error");
    } else {
        console.log("Connect To PostgreSql");
    }
})

module.exports = pool