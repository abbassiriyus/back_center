
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const pool = require("../db")

router.get('/users', function(req, res) {
        pool.query("SELECT * FROM users", (err, result) => {
            if (!err) {
                res.status(200).send(result.rows)
            } else {
                res.send(err)
            }
        })
});


router.get('/oneuser', function(req, res) {
 
});
router.get('/teacherall', function(req, res) {
    res.send('Birds home page');
});  
router.post("/users", (req, res) => {
    const body = req.body
    pool.query('INSERT INTO users (email,username,password,fullname,user_img,user_all,user_time,syscreatedatutc) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',[body.email,body.username,body.password,body.fullname,body.user_img,body.user_all,body.user_time,new Date()], (err, result) => {
            if (err) {
                res.status(400).send(err)
            } else {
                res.status(201).send("Created")
            }
        })
})
router.post('/login', function(req, res) {
  res.send('About birds');
});

module.exports = router;

