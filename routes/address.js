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

router.get("/address", (req, res) => {   
    pool.query("SELECT * FROM address", (err, result) => {
        if (!err) {

            res.status(200).send(result.rows)

        } else {
            res.send(err)
        }
    })
})

router.get('/address/:id', (req, res) => {
    
    pool.query("SELECT * FROM address where address_id=$1", [req.params.id], (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})


router.post("/address", (req, res) => {
    const body = req.body
    pool.query('INSERT INTO address (country,city) VALUES ($1,$2) RETURNING *',
        [body.country,body.city], (err, result) => {
            if (err) {
                res.status(400).send(err)
            } else {
                res.status(201).send("Created")
            }
        })
})

router.delete("/address/:id", (req, res) => {
    const id = req.params.id
    pool.query('DELETE FROM address WHERE address_id = $1', [id], (err, result) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).send("Deleted")
        }
    })
})
router.put("/address/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    pool.query(
        'UPDATE address SET country=$1, city=$2  WHERE address_id = $3',
        [body.country,body.city, id],
        (err, result) => {
            if (err) {
                res.status(400).send(err)
            } else {
                res.status(200).send("Updated")
            }
        }
    )
})

module.exports = router;
