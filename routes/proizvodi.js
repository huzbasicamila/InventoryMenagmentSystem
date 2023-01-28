const express=require('express');
const connection= require('../connection');
const router=express.Router();
var auth=require('--/services/authentication');
var checkRole=require('../services/checkRole');
proizvodi
router.post('/add', auth.authenticateToken, checkRole.checkRole,(req,res)=>{
    let proizvodi=req.body;
    var query="insert into proizvodi(name, sirovineId, description, price, status) values (?,?,?,?,'true')";
    connection.query(query,[proizvodi.name, proizvodi.Id, proizvodi.description, proizvodi.price], (err, results)=>{
        if(!err){
            return res.status(200).json({message:"Proizvod dodan uspješno"});
        }
        else { 
            return res.status(500).json(err);
        }
    })
})

router.get('/get', auth.authenticateToken,(req,res,next)=>{
    var query = "select p.id, p.name, p.description, p.price, p.status, s.id as sivovineId, s.name as sirovineName from proizvodi as p INNER sirovine as s where p.sirovineId=s.id";
    connection.query(query,(err, results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;