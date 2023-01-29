const express=require('express');
const connection= require('../connection');
const router=express.Router();
var auth=require('--/services/authentication');
var checkRole=require('../services/checkRole');

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

router.get('/getbySirovine/:id', auth.authenticateToken,(req, res, next)=>{
    const id=req.params.id;
    var query= "select id, name from proizvod where sirovineId= ? and status ='true'";
    connection.query(query,[id], (err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.get('/getbyId/:id', auth.authenticateToken, (req, res, next)=>{
    const id=req.params.id;
    var query="select id, name, description, price from product where id=?";
    connection.query(query,[id], (err,results)=>{
        if(!err){
            return res.status(200).json(results[0]);
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/update/:id', auth.authenticateToken, checkRole.checkRole,(req,res,next)=>{
    let proizvodi=req.body;
    var query= "update proizvodi set name=?, sirovineId=?, description=?, price=? where id=?";
    connection.query(query, [proizvodi.name, proizvodi.sirocineId, proizvodi.description, proizvodi.price, proizvodi.id], (err, results)=>{
        if(!err) {
            if(results.affectedRows==0) {
                return res.status(404).json({message: "Proizvod id nije pronaden"});

            } 
            return res.status(200).json({message:"Proizvod je azuriran uspjesno"});
        }
        else { 
            return res.status(500).json(err);
        }
    })
})

router.delete('/delete', auth.authenticateToken, checkRole.checkRole,(req,res,next)=>{
    let id = req.body.id;
    var query="delete from proizvodi where id=?";
    connection.query(query, [id], (err, results)=>{
        if(!err) {
            if(results.affectedRows==0) {
                return res.status(404).json({message: "Proizvod id nije pronaden"});

            } 
            return res.status(200).json({message:"Proizvod je obrisan uspjesno"});
        }
        else { 
            return res.status(500).json(err);
        }
    })
})

router.patch('/updateStatus', auth.authenticateToken, checkRole.checkRole,(req,res,next)=>{
    let proizvodi=req.body;
    var query= "update proizvodi set status=? where id=?";
    connection.query(query, [proizvodi.status, proizvodi.id], (err, results)=>{
        if(!err) {
            if(results.affectedRows==0) {
                return res.status(404).json({message: "Proizvod id nije pronaden"});

            } 
            return res.status(200).json({message:"Status proizvoda je promijenjen"});
        }
        else { 
            return res.status(500).json(err);
        }
    })
})


module.exports = router;