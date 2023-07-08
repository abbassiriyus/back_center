
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

router.get("/student", (req, res) => {   
    pool.query("SELECT * FROM student", (err, result) => {
        if (!err) {

            res.status(200).send(result.rows)

        } else {
            res.send(err)
        }
    })
})

router.get('/student/:id', (req, res) => {
    
    pool.query("SELECT * FROM student where student_id=$1", [req.params.id], (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})


router.post("/student", (req, res) => {
    const body = req.body;
        pool.query('INSERT INTO student (user_id, status) VALUES ($1, $2) RETURNING *',
        [ body.user_id,body.status],
         (err, result) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).send("Created");
            }
        });
});

router.delete("/student/:id", (req, res) => {
    const id = req.params.id
    pool.query('DELETE FROM student WHERE student_id = $1', [id], (err, result) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).send("Deleted")
        }
    })
})
router.put("/student/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    pool.query(
        'UPDATE student SET user_id=$1 , status=$2   WHERE student_id = $3',
        [body.user_id,body.status, id],
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
