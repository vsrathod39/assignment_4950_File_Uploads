const express = require("express");
const Product = require("../models/product.model");
const uploadFile = require("../middlewares/upload");

const router = express.Router();

router.post("/", uploadFile.any("productImage"), async (req, res) => {
    try {
        const pathArray = req.files.map(({path}) => path);
        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            image_url: pathArray
        });
        return res.status(201).send({product});
    } catch (error) {
        return res.status(500).send({error: error.message, status: "failed to create product"});
    }
});

router.get("/", async (req, res) => {
    try {
        const product = await Product.find().lean().exec();
        return res.status(201).send({product});
    } catch (error) {
        return res.status(500).send({error: error.message, status: "failed to load product"});
    }
});

module.exports = router;