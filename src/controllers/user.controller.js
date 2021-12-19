const express = require("express");
const User = require("../models/user.model");
const uploadFile = require("../middlewares/upload");

const router = express.Router();

router.post("/registration", uploadFile.single("profile_pic"), async (req, res) => {
    try {
        // const pathArray = req.files.map(({path}) => path);
        const path_pic = req.file.path;
        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_pic: path_pic
        });
        return res.status(201).send(user);
    } catch (error) {
        return res.status(500).send({error: error.message, status: "failed to create product"});
    }
});

router.get("/", async (req, res) => {
    try {
        const users = await User.find().lean().exec();
        return res.status(201).send(users);
    } catch (error) {
        return res.status(500).send({error: error.message, status: "failed to load product"});
    }
});

module.exports = router;