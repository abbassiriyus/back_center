
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

router.get("/test", (req, res) => {   
    pool.query("SELECT * FROM test", (err, result) => {
        if (!err) {

            res.status(200).send(result.rows)

        } else {
            res.send(err)
        }
    })
})

router.get('/test/:id', (req, res) => {
    
    pool.query("SELECT * FROM test where test_id=$1", [req.params.id], (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})


router.post("/test", (req, res) => {
    const body = req.body;
        pool.query('INSERT INTO test (Theme, course_id) VALUES ($1, $2) RETURNING *',
        [ body.Theme,body.course_id],
         (err, result) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).send("Created");
            }
        });
});

router.delete("/test/:id", (req, res) => {
    const id = req.params.id
    pool.query('DELETE FROM test WHERE test_id = $1', [id], (err, result) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).send("Deleted")
        }
    })
})
router.put("/test/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    pool.query(
        'UPDATE test SET Theme=$1 , course_id=$2   WHERE test_id = $3',
        [body.Theme,body.course_id,test_id ],
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