const express = require("express")
const app = express()
const cors = require("cors")
const fileUpload = require("express-fileupload")
const pool = require("./db")
const fs = require("fs")

app.use(fileUpload())
app.use(cors())
app.use(express.static("Images"))

// course
app.get("/course", (req, res) => {
    pool.query("SELECT * FROM course", (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.send(err)
        }
    })
})

app.get('/course/:id', (req, res) => {
    pool.query("SELECT * FROM course where courseid=$1", [req.params.id], (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})

app.post("/course", (req, res) => {
    const body = req.body
    pool.query('INSERT INTO course (coursename, price, year, model, color, make, transmission, condition, fuel, engine) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
        [body.coursename, body.price, body.year, body.model, body.color, body.make, body.transmission, body.condition, body.fuel, body.engine], (err, result) => {
            if (err) {
                res.status(400).send(err)
            } else {
                res.status(201).send("Created")
            }
        })
})

app.delete("/course/:id", (req, res) => {
    const id = req.params.id
    pool.query('DELETE FROM course WHERE courseid = $1', [id], (err, result) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).send("Deleted")
        }
    })
})

app.put("/course/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    pool.query(
        'UPDATE course SET coursename = $1, price = $2, year=$3, model=$4, color=$5, make = $6, transmission = $7, condition=$8, fuel=$9, engine=$10 WHERE courseid = $11',
        [body.coursename, body.price, body.year, body.model, body.color, body.make, body.transmission, body.condition, body.fuel, body.engine, id],
        (err, result) => {
            if (err) {
                res.status(400).send(err)
            } else {
                res.status(200).send("Updated")
            }
        }
    )
})


app.listen(5000, () => {
    console.log("Localhost is Running");
})