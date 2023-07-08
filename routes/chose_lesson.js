
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

router.get("/chose_lesson", (req, res) => {   
    pool.query("SELECT * FROM chose_lesson", (err, result) => {
        if (!err) {

            res.status(200).send(result.rows)

        } else {
            res.send(err)
        }
    })
})

router.get('/chose_lesson/:id', (req, res) => {
    
    pool.query("SELECT * FROM chose_lesson where chose_lesson_id=$1", [req.params.id], (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})


router.post("/chose_lesson", (req, res) => {
    const body = req.body;
        pool.query('INSERT INTO chose_lesson (lesson_id,Theme,course_id,status) VALUES ($1, $2,3$,4$) RETURNING *',
        [ body.lesson_id,body.Theme,body.course_id,body.status],
         (err, result) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).send("Created");
            }
        });
});

router.delete("/chose_lesson/:id", (req, res) => {
    const id = req.params.id
    pool.query('DELETE FROM chose_lesson WHERE chose_lesson_id = $1', [id], (err, result) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).send("Deleted")
        }
    })
})
router.put("/chose_lesson/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    pool.query(
        'UPDATE test SET lesson_id=$1 , Theme=$2 , course_id=$3 , status=$4  WHERE chose_lesson_id= $5',
        [ body.lesson_id,body.Theme,body.course_id,body.status],
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