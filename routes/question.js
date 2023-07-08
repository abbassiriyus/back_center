
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

router.get("/question", (req, res) => {   
    pool.query("SELECT * FROM question", (err, result) => {
        if (!err) {

            res.status(200).send(result.rows)

        } else {
            res.send(err)
        }
    })
})

router.get('/question/:id', (req, res) => {
    
    pool.query("SELECT * FROM question where question_id=$1", [req.params.id], (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})


router.post("/question", (req, res) => {
    const body = req.body;
        pool.query('INSERT INTO question (question, Answer,Ball,test_id) VALUES ($1, $2,3$,4$) RETURNING *',
        [body.question,body.Answer,body.Ball,body.test_id],
         (err, result) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).send("Created");
            }
        });
});

router.delete("/question/:id", (req, res) => {
    const id = req.params.id
    pool.query('DELETE FROM question WHERE question_id = $1', [id], (err, result) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).send("Deleted")
        }
    })
})
router.put("/question/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    pool.query(
        'UPDATE test SET question=$1 , Answer=$2 , Ball=$3 , test_id=$4  WHERE question_id = $5',
        [body.question,body.Answer,body.Ball,body.test_id],
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