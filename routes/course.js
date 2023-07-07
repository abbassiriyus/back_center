
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const pool = require("../db")


// token success
function ensureToken(req,res,next){
    const bearerHeader=req.headers['authorization']
    if( typeof bearerHeader!== 'undefined'){
    const bearer=bearerHeader.split(" ")
    const bearerToken=bearer[1]
    req.token=bearerToken
    next()
    }else{
        res.status(403)
    }
}

router.get("/course", (req, res) => {   
    pool.query("SELECT * FROM course", (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.send(err)
        }
    })
})

router.get('/course/:id', (req, res) => {
    
    pool.query("SELECT * FROM course where course_id=$1", [req.params.id], (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})


router.post("/course", (req, res) => {
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



module.exports = router;
