const { Client } = require("pg")

const pool = new Client({
    user: "postgres",
    host: "containers-us-west-204.railway.app",
    database: "railway",
    password: "U4ktHuhpbR5QpI0cJx3z",
    port: 7934
})

pool.connect(err => {
    if(err) {
        console.log("Connect Error");
    } else {
        console.log("Connect To PostgreSql");
    }
})

module.exports = pool