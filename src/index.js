const express = require("express");
const app = express();
app.use(express.json())
const cors = require("cors");
app.use(cors());

const userController = require("./controllers/user.controller");
const { register, login, generateToken } = require("./controllers/auth.controller")
const babyController = require("./controllers/baby.controller")
const passport = require("./configs/Oauth")


app.use("/users", userController);
app.use("/login",login)
app.use("/register", register);
app.use("/baby_page", babyController)

app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login",
      successRedirect:"https://www.linkedin.com/feed/",
      session: false,
    }),
    function (req, res) {
      const token = generateToken(req.user);
      return res.status(200).send({ user: req.user, token });
    }
  );

module.exports = app;