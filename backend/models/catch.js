module.exports = function(sequelize, DataTypes) {
    var Catch = sequelize.define("Catch", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      length: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      location: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      kind_of_bait: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      time: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type_of_fish: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      weather_temperature: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      weather_conditions: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      img: {
        type: DataTypes.URL,
        allowNull: false,
      },
    });
  
    Catch.associate = function(models) {
      // We're saying that a Catch should belong to an User
      // A Catch can't be created without an User due to the foreign key constraint
      Catch.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Catch;
  };