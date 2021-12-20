const fs = require("fs");
const User = require("../models/user.model");

module.exports = async (id) => {
    let path = await User.findById(id).lean().exec();
    path = path.profile_pic;

    try {
        fs.unlinkSync(path);
    } catch (error) {
        // console.error(error);
    }
};