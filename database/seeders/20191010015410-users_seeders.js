"use strict";
import { encrypt } from "../../utils/helper";

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "user1@automart.com",
          first_name: "User",
          last_name: "User",
          password: encrypt("admin"),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: "admin@automart.com",
          first_name: "Admin",
          last_name: "Admin",
          is_admin: true,
          password: encrypt("admin"),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
