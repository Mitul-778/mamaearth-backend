const express = require("express");
const app = express();
app.use(express.json())
const cors = require("cors");
app.use(cors());

const userController = require("./controllers/user.controller");
const { register, login, generateToken } = require("./controllers/auth.controller")


app.use("/users", userController);
app.use("/login",login)
app.use("/register", register);




module.exports = app;