const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");

require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: `68167193531-e6l11r44f5kg9q5emb1uk3nuk7i6geee.apps.googleusercontent.com`,
      clientSecret: `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`,
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