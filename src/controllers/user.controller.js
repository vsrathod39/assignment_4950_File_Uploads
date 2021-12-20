const express = require("express");
const User = require("../models/user.model");
const uploadFile = require("../middlewares/upload");
const deleteFile = require("../middlewares/delete.file");
const deleteMulty = require("../middlewares/deleteMultiple.file");
const Galery = require("../models/userGalery.model");

const router = express.Router();

router.post("/", uploadFile.single("profile_pic"), async (req, res) => {
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

router.patch("/", uploadFile.single("profile_pic"), async (req, res) => {
    try {
        if(req?.file?.path) {
            req.body.profile_pic = req.file.path;
            deleteFile(req.query.id);
        }
        const user = await User.findByIdAndUpdate(req.query.id, req.body).lean().exec();
        return res.status(201).send(user);
    } catch (error) {
        return res.status(500).send({error: error.message, status: "failed to create product"});
    }
});

router.delete("/", async (req, res) => {
    try {
        deleteFile(req.query.id);
        const galData = await Galery.find({user_id: {$eq: req.query.id}});
        galData.forEach(async ({_id, pictures}) => {
            await Galery.findByIdAndDelete(_id.toString());
            pictures.forEach( path => {
                deleteMulty(path);
            });
        });
        const user = await User.findByIdAndDelete(req.query.id);
        return res.status(201).send(galData);
    } catch (error) {
        return res.status(500).send({error: error.message, status: "failed to delete product"});
    }
});

module.exports = router;