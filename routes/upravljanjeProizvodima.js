const express=require('express');
const connection= require('../connection');
const router=express.Router();
var checkRole=require('../services/checkRole');

// Get all products
router.get('/upravljanjeProizvodima', async (req, res) => {
    try {
        const products = await db.proizvodi.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new product
router.post('/upravljanjeProizvodima', async (req, res) => {
    try {
        const { name, sirovineId, description, price, status } = req.body;
        const margin = req.body.margin;
        const rawMaterial = await db.sirovine.findByPk(sirovineId);
        const productPrice = (rawMaterial.price * margin) / 100 + rawMaterial.price;
        const vat = productPrice * 0.17;
        const product = await db.proizvodi.create({
            name,
            sirovineId,
            description,
            price: productPrice,
            status,
            vat
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a product
router.put('/upravljanjeProizvodima/:id', async (req, res) => {
    try {
        const { name, sirovineId, description, price, status } = req.body;
        const margin = req.body.margin;
        const rawMaterial = await db.sirovine.findByPk(sirovineId);
        const productPrice = (rawMaterial.price * margin) / 100 + rawMaterial.price;
        const vat = productPrice * 0.17;
        const product = await db.proizvodi.findByPk(req.params.id);
        if (product) {
            product.name = name;
            product.sirovineId = sirovineId;
            product.description = description;
            product.price = productPrice;
            product.status = status;
            product.vat = vat;
            await product.save();
            res.json(product);
        } else {
            res.status(404).json({ message: 'Proizvod nije pronaden' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a product
router.delete('/upravljanjeProizvodima/:id', async (req, res) => {
    try {
        const product = await db.proizvodi.findByPk(req.params.id);
        if (product) {
            await product.destroy();
            res.json({ message: 'Proizvod obrisan' });
        } else {
            res.status(404).json({ message: 'Proizvod nije pronaden' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports=router;
