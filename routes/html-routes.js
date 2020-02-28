module.exports = function (app) {

  // GET route for our landing page
  app.get("/", function (req, res) {
    if (req.isAuthenticated()) {
      const user = {
        id: req.session.passport.user,
        isLoggedIn: req.isAuthenticated(),
        name: req.user.name
      }
      res.render("home", user);
    } else {
      res.render("home");
    }
  });

  // GET route for search page
  app.get("/search", function (req, res) {
    if (req.isAuthenticated()) {
      const user = {
        id: req.session.passport.user,
        isLoggedIn: req.isAuthenticated(),
        name: req.user.name
      }
      res.render("recipe-search", user);
    } else {
      res.render("public-recipe-search");
    }
  });

  // GET route for sign-up page
  app.get("/signup", function (req, res) {
    if (req.isAuthenticated()) {
      res.redirect("/accounts/view");
    } else {
      res.render("accounts");
    }
  });
};
