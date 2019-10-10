"use strict";
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN
    },
    {}
  );
  Users.associate = function(models) {
    // associations can be defined here
    Users.hasMany(models.Cars, {
      foreignKey: "owner",
      onDelete: "CASCADE"
    });
    Users.hasMany(models.Orders, {
      foreignKey: "buyer",
      onDelete: "CASCASDE"
    });
    Users.hasMany(models.Flags, {
      foreignKey: "userId"
    });
  };
  return Users;
};
