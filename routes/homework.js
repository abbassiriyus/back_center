
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

router.get("/homework", (req, res) => {   
    pool.query("SELECT * FROM homework", (err, result) => {
        if (!err) {

            res.status(200).send(result.rows)

        } else {
            res.send(err)
        }
    })
})

router.get('/homework/:id', (req, res) => {
    
    pool.query("SELECT * FROM homework where homework_id=$1", [req.params.id], (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})


router.post("/homework", (req, res) => {
    const body = req.body;
        pool.query('INSERT INTO homework (video_id, lesson_id) VALUES ($1, $2) RETURNING *',
        [ body.video_id,body.lesson_id],
         (err, result) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).send("Created");
            }
        });
});

router.delete("/homework/:id", (req, res) => {
    const id = req.params.id
    pool.query('DELETE FROM homework WHERE homework_id = $1', [id], (err, result) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).send("Deleted")
        }
    })
})
router.put("/homework/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    pool.query(
        'UPDATE homework SET video_id=$1 , lesson_id=$2   WHERE homework_id = $3',
        [body.video_id,body.lesson_id,homework_id ],
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
