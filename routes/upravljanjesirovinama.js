const express=require('express');
const connection= require('../connection');
const router=express.Router();
var checkRole=require('../services/checkRole');





router.get('/sirovine', (req, res) => {
  client.query('SELECT * FROM sirovine', (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error ' });
    }
    res.status(200).json(result.rows);
  });
});

router.post('/sirovine', (req, res) => {
  const { name } = req.body;
  client.query(
    'INSERT INTO sirovine (name) VALUES ($1)',
    [name],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error dodavanje sirovina' });
      }
      res.status(201).json({ message: 'Sirovine dodane uspjesno' });
    }
  );
});

router.put('/sirovine/:id', (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  client.query(
    'UPDATE sirovine SET name=$1 WHERE id=$2',
    [name, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error updating sirovina' });
      }
      res.status(200).json({ message: 'Sirovine updateovane' });
    }
  );
});


module.exports = router;