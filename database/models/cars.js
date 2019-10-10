"use strict";
module.exports = (sequelize, DataTypes) => {
  const Cars = sequelize.define(
    "Cars",
    {
      owner: DataTypes.STRING,
      state: DataTypes.STRING,
      status: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      model: DataTypes.STRING,
      manufacturer: DataTypes.STRING,
      body_type: DataTypes.STRING,
      primary_image: DataTypes.STRING
    },
    {}
  );
  Cars.associate = function(models) {
    // associations can be defined here
    Cars.hasMany(models.Orders, {
      foreignKey: "car",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
    Cars.belongsTo(models.Users, {
      foreignKey: "owner",
      onDelete: "CASCADE"
    });
    Cars.hasMany(models.Flags, {
      foreignKey: "car",
      onDelete: "CASCADE"
    });
  };
  return Cars;
};
