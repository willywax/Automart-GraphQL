"use strict";
export default (sequelize, DataTypes) => {
  const Orders = sequelize.define(
    "Orders",
    {
      buyer: DataTypes.NUMBER,
      car: DataTypes.NUMBER,
      status: DataTypes.STRING,
      price_offered: DataTypes.DECIMAL
    },
    {}
  );
  Orders.associate = function(models) {
    // associations can be defined here
    Orders.belongsTo(models.Cars, {
      foreignKey: "car"
    });
    Orders.belongsTo(models.Users, {
      foreignKey: "buyer"
    });
  };
  return Orders;
};
