// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
// Creating our User model
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    // uuid: {
    //   primaryKey: true,
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV1,
    //   isUnique: true
    // },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preference1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preference2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // Regex - Minimum eight characters, at least one letter, one number and one special character:
        // is: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g
        is: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&./])[A-Za-z\d@$!%*#?&./]{8,}$/g
      }
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  // User.addHook('beforeBulkUpdate', function (user) {
  //   user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  // })

  User.associate = function (models) {
    // Associating User with Recipes
    // When an User is deleted, also delete any associated Recipes
    User.hasMany(models.Recipe, {
      onDelete: "cascade",
      hooks: true
    });
  };

  return User;
};
