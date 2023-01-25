const { query } = require('express');
const express= require('express');
const connection=require('../connection');
const router=express.Router();
var auth=require('../services/authentication');
var checkRole= require("../services/checkRole");

router.post('/add', auth.authenticateToken, checkRole.checkRole,(req,res,next)=>{
    let sirovine=req.body;
    query="insert into sirovine (name) values(?)";
    connection.query(query,[sirovine.name],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"Sirovine uspjesno dodana"});
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.get('/get', auth.authenticateToken,(req,res,next)=>{
    var query= "select *from sirovine order by name";
    connection.query(query,(err,results)=>{
        if(!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/update', auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let product=req.body;
    var query="update sirovine set name=? where id=?";
    connection.query(query,[product.name, product.id], (err, results)=>{
        if(!err){
            if(results.affectedRows==0){
                return res.status(404).json({message:"Sirovina id nije pronadena"});
            }
            return res.status(200).json({message:"Sirovina uspjesno updateovana"});
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.delete('/delete/:id',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let productId=req.params.id;
    let query="delete from sirovine where id=?";
    connection.query(query,[productId], (err, results)=>{
        if(!err){
            if(results.affectedRows==0){
                return res.status(404).json({message:"Sirovina id nije pronadena"});
            }
            return res.status(200).json({message:"Sirovina uspjesno obrisana"});
        }
        else {
            return res.status(500).json(err);
        }
    })
})
module.exports=router;