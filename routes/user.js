const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../connection');
const { query } = require('express');
const { restart } = require('nodemon');
const router = express.Router();

router.use(bodyParser.json());

const jwt = require('jsonwebtoken');
const nodemailer=('nodemailer');
require('dotenv').config();
var auth= require('../services/authentication');
var checkRole=require('../services/checkRole');
router.post('/signup', async (req, res) => {
    try {
        let user = req.body;
        let query = "select email, password, role, status from user where email=?";
        let results = await connection.query(query, [user.email]);
        if (results.length <= 0) {
            //query = "insert into user(name, contactNumber, email, password, status, role) values (?,?,?,?,'false','user')";
            //connection.query(query, [user.name, user.contactNumber, user.email, user.password]);
            //return res.status(200).json({ message: "Successfully Registered" });
            return res.status(400).json({ message: "Email već postoji." });
        } else {
            query = "insert into user(name, contactNumber, email, password, status, role) values (?,?,?,?,'false','user')";
            connection.query(query, [user.name, user.contactNumber, user.email, user.password]);
            return res.status(200).json({ message: "Successfully Registered" });
            //return res.status(400).json({ message: "Email već postoji." });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.post('/login', (req, res) => {
    const user = req.body;
    let query = "select email, password, role, status from user where email=?";
    try{ 
        
        connection.query(query, [user.email], (err, results) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (results.length <= 0 || results[0].password != user.password) {
                return res.status(401).json({ message: "Netačan username ili password" });
            }
            else if (results[0].status === 'false') {
                return res.status(401).json({ message: "Pricekajte da Admin odobri" });
            }
            else if (results[0].password == user.password) {
                const response = { email: results[0].email, role: results[0].role }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' })
                res.status(200).json({ token: accessToken });
            }
            else {
                return res.status(400).json({ message: "Nešto nije uredu. Pokušajte ponovo." });
            }
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
})
/* PROMJENA LOZINKE 
var transporter=nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})


router.post('/forgotPassword', (req,res)=>{
    const user=req.body;
    query="select email, password from user where email=?";
    connection.query(query,[user.email], (err,results)=>{
        if(!err){ 
            if(results.length<=0) {
                return res.status(200).json({message:"Lozinka je poslana na vaš mail"});
            } else {
                var mailOptions={
                    from:process.env.EMAIL,
                    to:result[0].email,
                    subject: "Lozinka za upravljanje zalihama",
                    html: '<p><b>Vaši Login detalji za upravljanje zalihama</b><br><b>Email: </b>'+results[0].email+'<br><b>Lozinka: </b>'+results[0].password+'<br><a href="http://localhost:4200/>Pritisni ovdje za login</a></p>'
                };
                transporter.sendMail(mailOptions, function(error, info) {
                    if(error) {
                        console.log(error);
                    }
                    else {
                        console.log('Email poslan: ' +info.response);
                    }
                });
                return res.status(200).json({message:"Pavord je poslan na vaš email"});                
            }
        }   else {
            return res.status(500).json(err);
        }
    })
})  */

router.get('/get', auth.authenticateToken,(req, res)=>{
    var query="select id,name,email,contactNumber,status from user where role='user'";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else { 
            return res.status(500).json(err);
        }
    })
})

router.patch('/update', auth.authenticateToken,(req,res)=>{
    let user= req.body;
    var query="update user set status=? where id=?";
    connection.query(query,[user.status,user.id],(err,results)=>{
        if(!err){
            if(results.affectedRows==0){
                return res.status(404),json({message: "Korisnik ne postoji!"});
            }
            return res.status(200).json({message:"Korisnik updateovan uspjesno"});
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.get('/chechToken', (req,res)=>{
    return res.status(200).json({message:"true"});
})
router.post('/changePassword', (req,res)=>{

})
module.exports = router;
