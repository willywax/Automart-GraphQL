'use strict';
module.exports = (sequelize, DataTypes) => {
  const Flags = sequelize.define('Flags', {
    car: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    reason: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Flags.associate = function(models) {
    // associations can be defined here
    Flags.belongsTo(models.Cars, {
      foreignKey: "car"
    });
    Flags.belongsTo(models.Users, {
      foreignKey: "userId"
    });
  };
  return Flags;
};