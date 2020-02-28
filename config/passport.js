const passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use("local-signup", new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },
  function (req, email, password, done) {
    // When a user tries to sign in this code runs
    process.nextTick(function () {
      db.User.findOne({
        where: {
          email: email
        }
      }).then(function (user, err) {
        if (err) {
          console.log("err", err);
          // return done(null, false, err);
          return done(err);
        }
        if (user) {
          return done(null, false, "That email is already taken");
        }
        else {
          db.User.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            city: req.body.city,
            state: req.body.state,
            preference1: req.body.preference1,
            preference2: req.body.preference2
          }).then(function (dbUser) {
            return done(null, dbUser);
          }).catch(function (err) {
            console.log(err);
            return done(null, false, err.errors[0].path);
          });
        }
      });
    });
  }));

passport.use("local-login", new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },
  function (req, email, password, done) {
    // Find a user whose email is the same as the forms email
    // We are checking to see if the user trying to login already exists
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function (user, err) {
      // If there are any errors, return the error before anything else
      if (err) {
        console.log("err", err);
        return done(err);
      }

      // If no user is found, return the message
      if (!user) {
        console.log("No user found");
        return done(null, false, "Email is not registered");
      }

      // If the user is found but the password is wrong
      if (user && !user.validPassword(req.body.password)) {
        return done(null, false, "Oops! Wrong password");
      }

      // All is well, return successful user
      return done(null, user);
    });
  }));

// Used to serialize the user for the session
passport.serializeUser(function (user, done) {
  done(null, user.id);
  // done(null, user.uuid);
});

// Used to deserialize the user
passport.deserializeUser(function (id, done) {
  db.User.findByPk(id).then(function (user) {
    if (user) {
      done(null, user.get());
    } else {
      done(null, false, { message: "error test" });
    }
  });
});

// Exporting our configured passport
module.exports = passport;