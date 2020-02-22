const passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use('local-signup', new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "email",
    passwordField: 'password',
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
          console.log("err", err)
          return done(err);
        }
        if (user) {
          console.log('signupMessage', 'That email is already taken.');
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        }
        // If there's no user with the given email
        // if (!user) {
        //   return done(null, false, {
        //     message: "Incorrect email."
        //   });
        // }
        // If there is a user with the given email, but the password the user gives us is incorrect
        // if (!user.validPassword(password)) {
        //   return done(null, false, {
        //     message: "Incorrect password."
        //   });
        // } 
        else {
          db.User.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            city: req.body.city,
            state: req.body.state,
            preference: req.body.preference
          }).then(function (dbUser) {
            return done(null, dbUser);
          }).catch(function (err) {
            // handle error;
            console.log(err);
          });
        }
        // If none of the above, return the user
      });
    });
  }))

passport.use('local-login', new LocalStrategy(
  {
    // by default, local strategy uses username and account_key, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  function (req, email, password, done) { // callback with email and account_key from our form

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function (user, err) {
      // console.log("user", user);
      // if there are any errors, return the error before anything else

      // console.log("&&&",err);

      // console.log("****",!user)
      // console.log("^^^",(!user.validPassword(req.body.account_key)));

      // if (err){
      //     console.log("err", err);
      //     return done(err);  
      // }


      // if no user is found, return the message

      if (!user) {
        console.log("no user found");
        return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
      }

      // if the user is found but the account_key is wrong
      if (user && !user.validPassword(req.body.password)) {

        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
      }

      // all is well, return successful user

      return done(null, user);

      // all is well, return successful user

    });

  }));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
// passport.serializeUser(function (user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function (obj, cb) {
//   cb(null, obj);
// });


// used to serialize the user for the session
passport.serializeUser(function (user, done) {
  // console.log("user.uuid",user.uuid);
  done(null, user.uuid);
});

// used to deserialize the user
passport.deserializeUser(function (uuid, done) {
  db.User.findByPk(uuid).then(function (user) {

    if (user) {

      done(null, user.get());

    } else {
      // console.log("user.errors", user.errors)
      done(null, false, { message: "error test" });
    }

  });
});

// Exporting our configured passport
module.exports = passport;