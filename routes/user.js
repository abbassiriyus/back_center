
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

// get alluser
router.get('/users', function(req, res) {
        pool.query("SELECT * FROM users", (err, result) => {
            if (!err) {
                res.status(200).send(result.rows)
                
            } else {
                res.send(err)
            }
        })
});
 
// get user position
router.get('/users/:id',ensureToken, function(req, res) {
    pool.query("SELECT * FROM users", (err, result) => {
        if (!err) {
           var a=result.rows.filter(item=>item.position*1===req.params.id*1)
            res.status(200).send(result.rows)
        } else {
            res.send(err)
        }
    })
});

// one token user
router.get('/oneuser', ensureToken, function(req, res) {
 console.log(req.token);
 var token=req.token
 jwt.verify(token,'secret',((require1,result1)=>{
    pool.query("SELECT * FROM users", (err, result) => {
        if (!err) {
      var a=result.rows.filter(item=>item.email===result1.email)
      var a2=a.filter(item=>item.user_password===result1.user_password)

            res.status(200).send(a2) 
        } else {
            res.send(err)
        }
    })
 }))
//  res.send("sdds").status(200)
});


// delete user
router.delete("/users/:id", (req, res) => {
    const id = req.params.id
    pool.query('DELETE FROM course WHERE courseid = $1', [id], (err, result) => {
        if (err) {
            res.status(400).send(err)
        } else {
            res.status(200).send("Deleted")
        }
    })
})


// create all user
// router.post("/users",ensureToken, (req, res) => {
//     const body = req.body
//         pool.query('INSERT INTO users (email,username,user_password,user_img,position,create_time) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',[body.email,body.username,body.user_password,body.user_img,body.position,new Date()], (err, result) => {
//             if (err) {
//                 res.status(400).send(err)
//             } else {
//                 res.status(201).send("Created")
//             }
//         })
// })
router.post("/users", (req, res) => {
    const body = req.body;
    const imgFile = req.files.course_img
    const imgName = Date.now()+imgFile.name
    pool.query('INSERT INTO users (user_password, email, "surName", "LastName", databirth, "dataRegirter", address_id, position_id, username,user_img) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) RETURNING *',
    [ body.user_password,body.email, body.surName, body.LastName, body.databirth, body.dataRegirter, body.address_id, body.position_id, body.username,new Date()+imgName],
         (err, result) => {
            if (err) {
                res.status(400).send(err);
            } else {
                imgFile.mv(`${__dirname}/Images/${imgName}`)
                res.status(201).send("Created");
            }
        });
});


// login in user_password email username
router.post('/login', function(req, res) {
    var body=req.body
    pool.query("SELECT * FROM users", (err, result) => {
        if (!err) {
            var token
            var position
        var a=false
        result.rows.map(item=>{
        if(item.user_password==body.user_password && (item.email==body.email || item.username==body.username)){
                  token = jwt.sign({ user_password:body.user_password,email:body.email }, 'secret');
                  position=item.position
                 a=true }
           })
       if(!a){res.status(500).send("Royhatdan o`tmagan") }else{
        res.status(200).send({access:token,position}) 
       }
        } else {
            res.status(401).send(err)
        }
    })
    
});

// put data 
router.put("/users/:id", (req, res) => {
    const id = req.params.id
    const body = req.body
    pool.query(
        'UPDATE users SET email = $1, username = $2, user_password=$3, user_img=$4, position=$5  WHERE user_id = $6',
        [body.email, body.username, body.user_password, body.user_img,body.position, id],
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

