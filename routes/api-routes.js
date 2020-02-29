// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const bcrypt = require("bcryptjs");

module.exports = function (app) {
  // GET route for member-only account page
  app.get("/accounts/view", function (req, res) {
    console.log("%%%%%%%%% is logged in", req.isAuthenticated());

    if (req.isAuthenticated()) {
      console.log("req.session.passport.user ", req.session.passport.user);
      db.User.findOne({
        where: {
          id: req.session.passport.user
          // uuid: req.session.passport.user
        }
      }).then(function (dbUser) {
        console.log("dbUser.dataValues ", dbUser.dataValues);
        const user = {
          userInfo: dbUser.dataValues,
          id: req.session.passport.user,
          isLoggedIn: req.isAuthenticated(),
          name: req.user.name
        }
        res.render("view-account", user);
      });
    } else {
      const user = {
        id: null,
        isLoggedIn: req.isAuthenticated()
      }
      res.redirect("/");
    }
  });

  // POST route for user sign-up
  app.post("/signup", function (req, res, next) {
    passport.authenticate("local-signup", function (err, user, info) {
      console.log("err", err);
      console.log("user", user);
      console.log("info", info);
      if (err) {
        console.log("passport err", err);
        return next(err);
      }
      if (!user) {
        return res.send({ success: false, message: info });
      }

      req.login(user, loginErr => {
        if (loginErr) {
          console.log("loginerr", loginerr);
          return next(loginErr);
        }
        console.log("redirecting....");
        console.log("user-email", user.email);
        res.cookie("email", user.email);
        return res.send({ success: true });
      });
    })(req, res, next);
  });

  // POST route for user log-in
  app.post("/login", function (req, res, next) {
    passport.authenticate("local-login", function (err, user, info) {
      console.log("err", err);
      console.log("\n\n\n########userrrr", user);
      console.log("info", info);
      if (err) {
        console.log("passport err", err);
        return next(err);
      }
      if (!user) {
        return res.send({ success: false, message: info });
      }

      req.login(user, loginErr => {
        if (loginErr) {
          console.log("loginerr", loginErr)
          return next(loginErr);
        }
        console.log("redirecting....")
        res.cookie("email", user.email);
        return res.json(true);
      });
    })(req, res, next);
  });

  // deleting User accounts and all associated recipes
  app.delete("/accounts/delete", function (req, res) {
    if (req.isAuthenticated()) {
      console.log("req.session.passport.user ", req.session.passport.user);
      db.User.findOne({
        where: {
          id: req.session.passport.user
          // uuid: req.session.passport.user
        }
      }).then(function (user) {
        console.log("password validation for deletion: " + user.validPassword(req.body.passwordEntered));
        if (user && user.validPassword(req.body.passwordEntered)) {
          db.User.destroy({
            where: {
              id: req.session.passport.user
              // uuid: req.session.passport.user
            }
          }).then(function () {
            res.send({ success: true, message: "Deleted successfully" });
          });
        }
        else {
          res.send({ success: false, message: "Invalid password" });
        }
      });
    } else {
      res.send({ success: false, message: "Not logged in" });
    }
  });

  // deleting a single recipe
  app.delete("/api/savedRecipes/:id", function (req, res) {
    db.Recipe.destroy({
      where: {
        id: req.params.id
      }
    }).then(function () {
      res.send({ success: true, message: "Deleted saved recipe" });
    })
  })

  // PUT route for updating user information
  app.put("/accounts/update/info", function (req, res) {
    console.log(req.body);
    if (req.isAuthenticated()) {
      console.log("req.session.passport.user ", req.session.passport.user);
      db.User.update(
        req.body,
        {
          where: {
            id: req.session.passport.user
            // uuid: req.session.passport.user
          }
        }).then(function (user, err) {
          if (err) console.log("err(line:159)", err);
          res.send({ success: true, message: "Successfully updated" });
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      res.send({ success: false, message: "Not logged in" });
    }
  });

  // PUT route for updating user password
  app.put("/accounts/update/password", function (req, res) {
    console.log(req.body);
    if (req.isAuthenticated()) {
      console.log("req.session.passport.user ", req.session.passport.user);
      db.User.findOne({
        where: {
          id: req.session.passport.user
          // uuid: req.session.passport.user
        }
      }).then(function (user) {
        const regEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&./])[A-Za-z\d@$!%*#?&./]{8,}$/;
        if (!user.validPassword(req.body.oldPasswordEntered)) {
          res.send({ success: false, message: "Current password does not match" });
        }
        else if (!regEx.test(req.body.newPasswordEntered)) {
          res.send({ success: false, message: "Password has to be minimum eight characters, at least one letter, one number and one special character" });
        } else {
          const newHashedPassword = bcrypt.hashSync(req.body.newPasswordEntered, bcrypt.genSaltSync(10), null);
          const newPassword = { password: newHashedPassword };
          console.log("Hashed password: ", newHashedPassword);
          db.User.update(
            newPassword,
            {
              where: {
                id: req.session.passport.user
              }
            }).then(function (user, err) {
              if (err) console.log("err", err);
              res.send({ success: true, message: "Password updated successfully" });
            })
            .catch(function (err) {
              console.log(err);
              res.send({ success: false, message: "Validation error" });
            });
        }
      });
    } else {
      res.send({ success: false, message: "Not logged in" });
    }
  });

  // GET route for logging out the user
  app.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
      req.logout();
      res.clearCookie("email");
      res.redirect("/");
    });
  });

  // GET route for recipes
  app.get("/api/savedRecipes/:id", function (req, res) {
    db.User.findAll({
      where: {
        id: req.params.id
      },
      include: [db.Recipe]
    }).then(function (dbRecipe) {
      // console.log(dbRecipe)
      res.json(dbRecipe);
    })
  })


  // POST route for saving a new recipe
  app.post("/api/savedRecipes", function (req, res) {

    db.Recipe.create({
      image: req.body.image,
      label: req.body.label,
      url: req.body.url,
      calories: req.body.calories,
      totalTime: req.body.totalTime,
      ingredientLines: req.body.ingredientLines,
      dietLabels: req.body.dietLabels,
      healthLabels: req.body.healthLabels,
      UserId: req.body.userId
    })
      .then(function (dbRecipe) {
         // console.log(req)
         // console.log(res)
        res.json(dbRecipe);
         console.log(dbRecipe.id)
      });
  });


  // GET route for getting all of the recipes
  app.get("/api/savedRecipes", function (req, res) {
    db.Recipe.findAll({})
      .then(function (dbRecipe) {
      //   console.log(dbRecipe)
        res.json(dbRecipe);
      });
  });
};
