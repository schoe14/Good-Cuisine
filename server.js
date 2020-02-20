// Requiring necessary npm packages
require('dotenv').config();

const express = require("express");
const exphbs = require("express-handlebars");
const path = require('path');
// const session = require("express-session");
// Requiring passport as we've configured it
// const passport = require("./config/passport");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(path.join)("public"));
app.use(express.static(path.join(__dirname, "public")));
// We need to use sessions to keep track of our user's login status
// app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// local host "/" will display INDEX, /recipes and /saved show handlebars
// my thinking is that "/"" will be the passport / login page
app.get('/', (req, res) => res.send('INDEX'));
app.use('/recipes', require('./routes/recipes-search'));
app.use('/saved', require('./routes/saved-searches'));

// Routes
// =============================================================
// require("./routes/html-routes.js")(app);
// require("./routes/author-api-routes.js")(app);
// require("./routes/post-api-routes.js")(app);
// require("./routes/recipes-search")(app);



// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
