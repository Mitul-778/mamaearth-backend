const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");

require("dotenv").config();
const aws = require('aws-sdk');

let s3 = new aws.S3({
  SECRET: process.env.S3_SECRET,
  ID : process.env.S3_ID,
});

passport.use(
  new GoogleStrategy(
    {
      clientID: s3.config.ID,
      clientSecret: s3.config.SECRET,
      callbackURL: "https://mama-earth.herokuapp.com/auth/google/callback",
      scope: ['profile', 'email'],
    },
    async function (accessToken, refreshToken, profile, cb) {
      let user = await User.findOne({ email: profile?._json?.email })
        .lean()
        .exec();

      if (!user) {
        user = await User.create({
          first_name: profile._json.given_name,
          email: profile._json.email,
          password: uuidv4(),
          role: ["customer"],
        });
      }

      return cb(null, user);
    }
  )
);

module.exports = passport;