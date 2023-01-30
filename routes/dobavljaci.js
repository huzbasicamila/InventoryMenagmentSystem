const express=require('express');
const connection= require('../connection');
const router=express.Router();
var checkRole=require('../services/checkRole');

//Get all dobavljacis
router.get("/", async (req, res) => {
try {
const [rows, fields] = await connection.query("SELECT * FROM dobavljacis");
res.json(rows);
} catch (err) {
res.status(500).json({ message: err.message });
}
});

//Get one dobavljaci
router.get("/:id", async (req, res) => {
try {
const [rows, fields] = await connection.query("SELECT * FROM dobavljacis WHERE id = ?", [req.params.id]);
if (rows.length == 0) {
return res.status(400).json({ message: "Nemoguce pronaci dobavljaca" });
}
res.json(rows[0]);
} catch (err) {
res.status(500).json({ message: err.message });
}
});

//Create one dobavljaci
router.post("/", async (req, res) => {
const dobavljaci = {
name: req.body.name,
jib: req.body.jib,
VAT: req.body.VAT,
phone_number: req.body.phone_number,
contact_person: req.body.contact_person,
email_address: req.body.email_address,
start_date: req.body.start_date,
end_date: req.body.end_date
};
try {
const [result] = await connection.query("INSERT INTO dobavljacis SET ?", [dobavljaci]);
const [rows, fields] = await connection.query("SELECT * FROM dobavljacis WHERE id = ?", [result.insertId]);
res.status(201).json(rows[0]);
} catch (err) {
res.status(400).json({ message: err.message });
}
});

//Update one dobavljaci
router.patch("/:id", async (req, res) => {
let dobavljaci = {};
if (req.body.name != null) {
dobavljaci.name = req.body.name;
}
if (req.body.jib != null) {
dobavljaci.jib = req.body.jib;
}
if (req.body.VAT != null) {
dobavljaci.VAT = req.body.VAT;
}
if (req.body.phone_number != null) {
dobavljaci.phone_number = req.body.phone_number;
}
if (req.body.contact_person != null) {
  set.push(`contact_person = "${req.body.contact_person}"`);
}
if (req.body.email_address != null) {
  set.push(`email_address = "${req.body.email_address}"`);
}
if (req.body.start_date != null) {
  set.push(`start_date = "${req.body.start_date}"`);
}
if (req.body.end_date != null) {
  set.push(`end_date = "${req.body.end_date}"`);
}
if (set.length == 0) {
  return res.status(400).json({ message: "Nema podataka za azuriranje" });
}
    
    try {
      const updateddobavljaci = await res.dobavljaci.save();
      res.json(updateddobavljaci);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  //Delete one dobavljaci
  router.delete("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await connection.query(`DELETE FROM dobavljaci WHERE id = ?`, [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Nemoguce pronaci dobavljaca" });
      }
      res.json({ message: "Obrisi dobavljaca" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  async function getdobavljaci(req, res, next) {
    let dobavljaci;
    try {
      const query = `SELECT * FROM dobavljaci WHERE id = ?`;
      const result = await connection.query(query, [req.params.id]);
      dobavljaci = result[0];
      if (!dobavljaci) {
        return res.status(400).json({ message: "Nemoguce pronaci dobavljaca" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.dobavljaci = dobavljaci;
    next();
  } 
  
  module.exports = router;
