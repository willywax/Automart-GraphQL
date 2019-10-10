"use strict";
export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Flags", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      car: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Cars",
          key: "id",
          as: "car"
        }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
          as: "user"
        }
      },
      reason: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Flags");
  }
};
