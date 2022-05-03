const express = require("express");
const app = express();
app.use(express.json())
const cors = require("cors");
app.use(cors());

const userController = require("./controllers/user.controller");
const { register, login, generateToken } = require("./controllers/auth.controller")
const babyController = require("./controllers/baby.controller")


app.use("/users", userController);
app.use("/login",login)
app.use("/register", register);
app.use("/baby_page", babyController)



module.exports = app;