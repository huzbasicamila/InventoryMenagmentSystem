
const express = require('express');
const router = express.Router();

// Get Proizvodni_procesi
router.get('/', (req, res) => {
  let sql = 'SELECT * FROM Proizvodni_procesi';
  db.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

// Add Proizvodni_procesi
router.post('/', (req, res) => {
  let data = {name: req.body.name, start_date: req.body.start_date, end_date: req.body.end_date};
  let sql = 'INSERT INTO Proizvodni_procesi SET ?';
  db.query(sql, data, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

// Update Proizvodni_procesi
router.put('/', (req, res) => {
  let sql = 'UPDATE Proizvodni_procesi SET name = ?, start_date = ?, end_date = ? WHERE id = ?';
  let data = [req.body.name, req.body.start_date, req.body.end_date, req.body.id];
  db.query(sql, data, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

// Delete Proizvodni_procesi
router.delete('/', (req, res) => {
  let sql = 'DELETE FROM Proizvodni_procesi WHERE id = ?';
  let data = [req.body.id];
  db.query(sql, data, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

module.exports = router;