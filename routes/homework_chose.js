
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

router.get("/homework_chose", (req, res) => {   
    pool.query("SELECT * FROM homework_chose", (err, result) => {
        if (!err) {

            res.status(200).send(result.rows)

        } else {
            res.send(err)
        }
    })
})

router.get('/homework_chose/:id', (req, res) => {
    
    pool.query("SELECT * FROM homework_chose where homework_chose_id=$1", [req.params.id], (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})


router.post("/homework_chose", (req, res) => {
    const body = req.body;
        pool.query('INSERT INTO video_chose (video_chose_id,video_id,homework_id,status) VALUES ($1, $2,3$,4$) RETURNING *',
        [ body.video_chose_id,body.video_id,body.homework_id,body.status],
         (err, result) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).send("Created");
            }
        });
});

router.delete("/homework_chose/:id", (req, res) => {
    const id = req.params.id
    pool.query('DELETE FROM video_chose WHERE homework_chose_id = $1', [id], (err, result) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).send("Deleted")
        }
    })
})
router.put("/homework_chose/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    pool.query(
        'UPDATE test video_chose_id=$1 , video_id=$2 , homework_id=$3 , status=$4  WHERE homework_chose_id= $5',
        [ body.video_chose_id,body.video_id,body.homework_id,body.status],
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