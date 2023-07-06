
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
    if(body.position==1){
        pool.query('INSERT INTO users (email,username,user_password,user_img,position,create_time) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',[body.email,body.username,body.user_password,body.user_img,body.position,new Date()], (err, result) => {
            if (err) {
                res.status(400).send(err)
            } else {
                res.status(201).send("Created")
            }
        })
        res.status(201).send("Created")
    }else{
        res.status(400).send(err)
    }

})
router.post('/login', function(req, res) {
    var body=req.body
    pool.query("SELECT * FROM users", (err, result) => {
        if (!err) {
            var a=false
           result.rows.map(item=>{
            if(item.user_password==body.user_password && (item.email==body.email || item.username==body.username)){
                 var token = jwt.sign({ user_password: body.user_password }, 'shhhhh'); 
                 a=true
            res.status(200).send(token) 
            }
           })
       if(!a){res.status(500).send("Royhatdan o`tmagan") }
        } else {
            res.status(401).send(err)
        }
    })
    
});
router.post('/test', function(req, res) {
    res.send('About birds');
  });

module.exports = router;

