const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");

require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: `526675928925-hrbveebtk5i134f13npmi3uufj2dpjtc.apps.googleusercontent.com`,
      clientSecret: `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`,
      callbackURL: "https://mama-earth.herokuapp.com/auth/google/callback",
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