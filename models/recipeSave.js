module.exports = function(sequelize, DataTypes) {
    var Recipe = sequelize.define("Recipe", {
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
      },
      calories: {
        type: DataTypes.INTEGER,
        allowNull: false,
        len: [1]
      },
      totalTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
        len: [1]
      },
      ingredientLines: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      dietLabels: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      healthLabels: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      }
    });
  
    Recipe.associate = function(models) {
      // We're saying that a Recipe should belong to an User
      // A Recipe can't be created without an User due to the foreign key constraint
      Recipe.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Recipe;
  };