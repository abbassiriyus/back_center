
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

router.get("/video", (req, res) => {   
    pool.query("SELECT * FROM video", (err, result) => {
        if (!err) {

            res.status(200).send(result.rows)

        } else {
            res.send(err)
        }
    })
})

router.get('/video/:id', (req, res) => {
    
    pool.query("SELECT * FROM video where video_id=$1", [req.params.id], (err, result) => {
        if (!err) {
            res.status(200).send(result.rows)
        } else {
            res.status(400).send(err)
        }
    })
})


router.post("/video", (req, res) => {
    const body = req.body;
        pool.query('INSERT INTO video (lesson_id, video) VALUES ($1, $2) RETURNING *',
        [ body.lesson_id,body.video],
         (err, result) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(201).send("Created");
            }
        });
});

router.delete("/video/:id", (req, res) => {
    const id = req.params.id
    pool.query('DELETE FROM video WHERE video_id = $1', [id], (err, result) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).send("Deleted")
        }
    })
})
router.put("/video/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    pool.query(
        'UPDATE video SET lesson_id=$1 , video=$2   WHERE video_id = $3',
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
