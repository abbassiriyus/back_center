
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

router.get("/lesson", (req, res) => {   
    pool.query("SELECT * FROM lesson", (err, result) => {
        if (!err) {

            res.status(200).send(result.rows)

        } else {
            res.send(err)
        }
    })
})

router.get('/lesson/:id', (req, res) => {
    
    pool.query("SELECT * FROM lesson where lesson_id=$1", [req.params.id], (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})


router.post("/lesson", (req, res) => {
    const body = req.body;
        pool.query('INSERT INTO lesson (Theme, course_id) VALUES ($1, $2) RETURNING *',
        [ body.Theme,body.course_id],
         (err, result) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).send("Created");
            }
        });
});

router.delete("/lesson/:id", (req, res) => {
    const id = req.params.id
    pool.query('DELETE FROM lesson WHERE lesson_id = $1', [id], (err, result) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).send("Deleted")
        }
    })
})
router.put("/lesson/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    pool.query(
        'UPDATE lesson SET Theme=$1 , course_id=$2   WHERE lesson_id_id = $3',
        [body.video_id,body.Theme,course_id ],
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
