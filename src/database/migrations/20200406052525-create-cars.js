'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      owner: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id",
          as: "owner"
        }
      },
      state: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "AVAILABLE"
      },
      price: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      manufacturer: {
        type: Sequelize.STRING
      },
      body_type: {
        type: Sequelize.STRING
      },
      primary_image: {
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
    return queryInterface.dropTable('Cars');
  }
};