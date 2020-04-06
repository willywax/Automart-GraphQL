"use strict";
export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      buyer: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
          as: "buyer"
        }
      },
      car: {
        type: Sequelize.INTEGER,
        references: {
          model: "Cars",
          key: "id",
          as: "car"
        }
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "PENDING"
      },
      price_offered: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Orders");
  }
};
