
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

router.get("/video_chose", (req, res) => {   
    pool.query("SELECT * FROM video_chose", (err, result) => {
        if (!err) {

            res.status(200).send(result.rows)

        } else {
            res.send(err)
        }
    })
})

router.get('/video_chose/:id', (req, res) => {
    
    pool.query("SELECT * FROM video_chose where video_chose_id=$1", [req.params.id], (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})


router.post("/video_chose", (req, res) => {
    const body = req.body;
        pool.query('INSERT INTO video_chose (video_id,lesson_id,chose_lesson_id,status) VALUES ($1, $2,3$,4$) RETURNING *',
        [ body.video_id,body.lesson_id,body.chose_lesson_id,body.status],
         (err, result) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).send("Created");
            }
        });
});

router.delete("/video_chose/:id", (req, res) => {
    const id = req.params.id
    pool.query('DELETE FROM video_chose WHERE chose_lesson_id = $1', [id], (err, result) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).send("Deleted")
        }
    })
})
router.put("/video_chose/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    pool.query(
        'UPDATE test video_id=$1 , lesson_id=$2 , chose_lesson_id=$3 , status=$4  WHERE video_chose_id= $5',
        [ body.video_id,body.lesson_id,body.chose_lesson_id,body.status],
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