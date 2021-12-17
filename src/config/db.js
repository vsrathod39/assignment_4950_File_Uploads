const mongoose = require("mongoose");
require("dotenv").config();

module.exports = () => {
    return mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1ften.mongodb.net/fileUpLoad_4950`)
}