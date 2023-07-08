
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

router.get("/chose_course", (req, res) => {   
    pool.query("SELECT * FROM chose_course", (err, result) => {
        if (!err) {

            res.status(200).send(result.rows)

        } else {
            res.send(err)
        }
    })
})

router.get('/chose_course/:id', (req, res) => {
    
    pool.query("SELECT * FROM chose_course where chose_course_id=$1", [req.params.id], (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})


router.post("/chose_course", (req, res) => {
    const body = req.body;
        pool.query('INSERT INTO question (course_id,teacher_id,student_id,status) VALUES ($1, $2,3$,4$) RETURNING *',
        [ body.course_id,body.teacher_id,body.student_id,body.status],
         (err, result) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).send("Created");
            }
        });
});

router.delete("/chose_course/:id", (req, res) => {
    const id = req.params.id
    pool.query('DELETE FROM chose_course WHERE chose_course = $1', [id], (err, result) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).send("Deleted")
        }
    })
})
router.put("/chose_course/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    pool.query(
        'UPDATE test SET course_id=$1 , teacher_id=$2 , student_id=$3 , status=$4  WHERE chose_course_id= $5',
        [ body.course_id,body.teacher_id,body.student_id,body.status],
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