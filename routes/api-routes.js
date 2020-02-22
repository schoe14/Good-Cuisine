// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error

  // app.post("/api/login", passport.authenticate("local", {failureFlash: true}), function (req, res) {
  //   res.json(req.user);
  // });

  app.get("/signup", function (req, res) {
    res.render("accounts");
  });

  app.get("/accounts/view", function (req, res) {
    console.log("%%%%%%%%% is logged in", req.isAuthenticated());

    if (req.isAuthenticated()) {
      // const user = {
      //    id: req.session.passport.user,
      //    isloggedin: req.isAuthenticated()
      //  }
      console.log("req.session.passport.user ", req.session.passport.user);
      db.User.findOne({
        where: {
          uuid: req.session.passport.user
        }
      }).then(function (dbUser) {
        console.log("dbUser.dataValues ", dbUser.dataValues)
        const user = {
          userInfo: dbUser.dataValues,
          id: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        }
         res.render("view-account", user);
      })

    }
    else {
      const user = {
        id: null,
        isloggedin: req.isAuthenticated()
      }
      res.redirect("/");
    }

  });

  app.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      console.log("info", info);
      if (err) {
        console.log("passport err", err);
        return next(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting authentication status
      if (!user) {
        console.log("user error", user);
        return res.send({ success : false, message : 'authentication failed' });
      }

      req.login(user, loginErr => {
        if (loginErr) {
          console.log("loginerr", loginerr)
          return next(loginErr);
        }
        //const userId = user.dataValues.id;
        console.log('redirecting....');
        console.log("user-email", user.email);
        res.cookie('email', user.email);
        return res.redirect("/accounts/view");
      });      
    })(req, res, next);
  });


  app.post('/login', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
      console.log("\n\n\n########userrrr", user)
      if (err) {
        console.log("passport err", err);
        return next(err); // will generate a 500 error
      }
      // Generate a JSON response reflecting authentication status

      if (!user) {

        return res.send({ success: false, message: 'authentication failed' });
      }

      req.login(user, loginErr => {
        if (loginErr) {
          console.log("loginerr", loginErr)
          return next(loginErr);
        }
        //const userId = user.dataValues.id;
        console.log('redirecting....')
        res.cookie('email', user.email);

        return res.json(true);

      });
    })(req, res, next);
  });




// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
// app.post("/api/signup", function (req, res) {
//   db.User.create({
//     email: req.body.email,
//     password: req.body.password
//   })
//     .then(function () {
//       res.redirect(307, "/api/login");
//     })
//     .catch(function (err) {
//       res.status(401).json(err);
//     });
// });

// Route for logging user out
// app.get("/logout", function (req, res) {
//   req.logout();
//   res.redirect("/");
// });


app.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    req.logout();
    res.clearCookie('email');
    res.redirect('/');
  })
});

// Route for getting some data about our user to be used client side
// app.get("/api/user_data", function (req, res) {
//   if (!req.user) {
//     // The user is not logged in, send back an empty object
//     // res.json({});
//     res.redirect("/");
//   } else {
//     // Otherwise send back the user's email and id
//     // Sending back a password, even a hashed password, isn't a good idea
//     console.log("line 43(api-routes): " + req.user.email); // test
//     db.User.findOne({
//       where: {
//         email: req.user.email
//       }
//     }).then(function (results) {
//       console.log("line 49(api-routes): " + results.email)
//       res.render("members", { email: results.email });
//     })



//     // res.json({
//     //   email: req.user.email,
//     //   id: req.user.id
//     // });
//   }
// });
};