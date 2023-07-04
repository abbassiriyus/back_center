const express = require("express")
const app = express()
const cors = require("cors")
const fileUpload = require("express-fileupload")
const pool = require("./db")
const fs = require("fs")
const os = require('os');
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
    const imgFile = req.files.course_img
    const imgName = Date.now()+imgFile.name
    pool.query('INSERT INTO course (course_title_ru, course_title_uz, course_price, course_img, course_all, cartegoryid, course_time, course_teacherid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [body.course_title_ru, body.course_title_uz, body.course_price, req.hostname+"/"+imgName, body.course_all, body.cartegoryid, body.course_time, body.course_teacherid], (err, result) => {
            if (err) {
                res.status(400).send(err)
            } else {
                imgFile.mv(`${__dirname}/Images/${imgName}`)
                res.status(201).send("Created")
            }
        })
})

app.delete("/course/:id", (req, res) => {
    const id = req.params.id
    pool.query('DELETE FROM course WHERE courseid = $1', [id], (err, result) => {
        if (result.rows.length > 0) {
        if (err) {
            res.status(400).send(err)
        } else {
            fs.unlink(`./Images/${result.rows[0].image}`, function (err) {
                if (err && err.code == 'ENOENT') {
                    console.info("File doesn't exist, won't remove it.");
                } else if (err) {
                    console.error("Error occurred while trying to remove file");
                } else {
                    console.info(`removed`);
                }
            });
            res.status(200).send("Deleted")
        }}
    })
})

app.put("/course/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    pool.query(
        'UPDATE course SET course_title_ru = $1, course_title_uz = $2, course_price=$3, course_img=$4, course_all=$5, cartegoryid = $6, course_time = $7, course_teacherid=$8,  WHERE courseid = $9',
        [body.course_title_ru, body.course_title_uz, body.course_price, body.course_img, body.course_all, body.cartegoryid, body.course_time, body.course_teacherid, id],
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