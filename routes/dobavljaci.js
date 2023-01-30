const express=require('express');
const connection= require('../connection');
const router=express.Router();
var checkRole=require('../services/checkRole');


//Get all dobavljacis
router.get("/", async (req, res) => {
    try {
      const dobavljaci = await dobavljaci.find();
      res.json(dobavljaci);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  //Get one dobavljaci
  router.get("/:id", getdobavljaci, (req, res) => {
    res.json(res.dobavljaci);
  });
  
  //Create one dobavljaci
  router.post("/", async (req, res) => {
    const dobavljaci = new dobavljacis({
      name: req.body.name,
      jib: req.body.jib,
      VAT: req.body.VAT,
      phone_number: req.body.phone_number,
      contact_person: req.body.contact_person,
      email_address: req.body.email_address,
      start_date: req.body.start_date,
      end_date: req.body.end_date
    });
    try {
      const newdobavljaci = await dobavljaci.save();
      res.status(201).json(newdobavljaci);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  //Update one dobavljaci
  router.patch("/:id", getdobavljaci, async (req, res) => {
    if (req.body.name != null) {
      res.dobavljaci.name = req.body.name;
    }
    if (req.body.jib != null) {
      res.dobavljaci.jib = req.body.jib;
    }
    if (req.body.VAT != null) {
      res.dobavljaci.VAT = req.body.VAT;
    }
    if (req.body.phone_number != null) {
      res.dobavljaci.phone_number = req.body.phone_number;
    }
    if (req.body.contact_person != null) {
      res.dobavljaci.contact_person = req.body.contact_person;
    }
    if (req.body.email_address != null) {
      res.dobavljaci.email_address = req.body.email_address;
    }
    if (req.body.start_date != null) {
      res.dobavljaci.start_date = req.body.start_date;
    }
    if (req.body.end_date != null) {
      res.dobavljaci.end_date = req.body.end_date;
    }
    try {
      const updateddobavljaci = await res.dobavljaci.save();
      res.json(updateddobavljaci);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  //Delete one dobavljaci
  router.delete("/:id", getdobavljaci, async (req, res) => {
    try {
      await res.dobavljaci.remove();
      res.json({ message: "Obrisi dobavljaca" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  async function getdobavljaci(req, res, next) {
    let dobavljaci;
    try {
      dobavljaci = await dobavljacis.findById(req.params.id);
      if (dobavljaci == null) {
        return res.status(400).json({ message: "Nemoguce pronaci dobavljaca" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.dobavljaci = dobavljaci;
    next();
  }
  
  module.exports = router;
