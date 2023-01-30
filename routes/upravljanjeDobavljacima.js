const express=require('express');
const connection= require('../connection');
const router=express.Router();
var checkRole=require('../services/checkRole');



const dobavljaci = require("../routes/dobavljaci");
const User = require("../routes/user");

// Get all dobavljacis
router.get("/", async (req, res) => {
  try {
    const dobavljacis = await dobavljaci.find();
    res.json(dobavljacis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific dobavljaci
router.get("/:id", getdobavljaci, (req, res) => {
  res.json(res.dobavljaci);
});

// Update a dobavljaci
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

// Middleware function to get dobavljaci by ID
async function getdobavljaci(req, res, next) {
  let dobavljaci;
  try {
    dobavljaci = await dobavljaci.findById(req.params.id);
    if (dobavljaci == null) {
      return res.status(404).json({ message: "Cannot find dobavljaci" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.dobavljaci = dobavljaci;
  next();
}

module.exports = router;
