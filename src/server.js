const express = require("express");
const connect = require("./config/db");

const userController = require("./controllers/user.controller");
const galeryController = require("./controllers/galery.controller");

const app = express();
app.use(express.json());

app.use("/user", userController);
app.use("/galery", galeryController);

app.listen(2345, async () => {
    await connect();
    console.log("Server running on port 2345");
});