// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
    if (req.isAuthenticated()) {
      const user = {
        id: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      }
      res.render("home", user);
    }
    else {
      res.render("home");
    }
  });

  app.get("/search", function (req, res) {
    if (req.isAuthenticated()) {
      const user = {
        id: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      }
      res.render("recipe-search", user);
    }
    else {
      res.render("recipe-search");
    }
  });

  app.get("/saved-recipes", function (req, res) {
    if (req.isAuthenticated()) {
      const user = {
        id: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      }
      res.render("saved", user);
    }
    else {
      res.redirect("/");
    }
  });


  // If the user already has an account send them to the members page
  // if (req.user) {
  //   res.redirect("/members");
  // }
  // res.render("signup");

  app.get("/signup", function (req, res) {
    if (req.isAuthenticated()) {
      res.redirect("/acounts/view");
    } else {
      res.render("accounts");
    }
  });

  // app.get("/login", function (req, res) {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     res.redirect("/members");
  //   }
  //   res.render("login");
  // });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/members", isAuthenticated, function (req, res) {
  //   // Otherwise send back the user's email and id
  //   // Sending back a password, even a hashed password, isn't a good idea
  //   res.redirect("/api/user_data");
  // });

};
