module.exports = function(sequelize, DataTypes) {
    var Catch = sequelize.define("Catch", {

      // HERE THE IMAGE RENDERS INTO THE PAGE
      location: {
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
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      bait: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fish: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      temperature: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      weathercondition: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
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