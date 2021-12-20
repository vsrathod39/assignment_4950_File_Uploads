const uploadFile = require("../middlewares/upload");
const Galery = require("../models/userGalery.model");
const express = require("express");
const router = express.Router();

router.post("/", uploadFile.array("profile_pic", 5), async (req, res) => {
    try {
        const pathArray = req.files.map(({path}) => path);
        // const path_pic = req.file.path;
        const user = await Galery.create({
            user_id: req.query.id,
            pictures: pathArray
        });
        return res.status(201).send(user);
    } catch (error) {
        return res.status(500).send({error: error.message, status: "failed to create product"});
    }
});

module.exports = router;