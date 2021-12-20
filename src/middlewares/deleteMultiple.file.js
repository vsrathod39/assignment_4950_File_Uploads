const fs = require("fs");

module.exports = (path) => {

    try {
        fs.unlinkSync(path);
    } catch (error) {
        // console.error(error);
    }
};