const express = require('express');
const bodyParser = require('body-parser');
const connection = require('../connection');
const { query } = require('express');
const { restart } = require('nodemon');
const router = express.Router();

router.use(bodyParser.json());

const jwt = require('jsonwebtoken');
require('dotenv').config();

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
});
module.exports = router;
