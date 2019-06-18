const helper = require("../utils/helper");
const client = require("../services/connection");

const userData = [];

class User {
  constructor(user) {
    this.id = helper.generateId();
    this.first_name = user.firstName;
    this.last_name = user.lastName;
    this.password = helper.encrypt(user.password);
    this.email = user.email;
    this.address = user.address;
    this.is_admin = false;
  }

  static logInUser(authenticatingUser) {
    const user = this.findUserByEmail(authenticatingUser.email);

    const response = {
      authenticated: false,
      data: null
    };
    if (user !== null) {
      const result = this.decrypt(user.password, authenticatingUser.password);

      if (result) {
        response.authenticated = true;

        //Creating authentication and authorization Token
        const token = jwt.sign(
          { userId: user.id, role: user.is_admin },
          "RANDOM_TOKEN",
          {
            expiresIn: "24h"
          }
        );

        user.token = token;

        response.data = user;
      }
    } else {
      response.authenticated = false;
      response.data = "Incorrect Username or Password";
    }
    return response;
  }

  static saveUser(user, done) {
    const query =
      "INSERT INTO users(id, first_name, last_name, email, password, address, is_admin)VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *";

    const values = [
      user.id,
      user.first_name,
      user.last_name,
      user.email,
      user.password,
      user.address,
      user.is_admin
    ];

    client.query(query, values, (err, res) => {
      if (err) {
        done(err, null);
      } else {
        done(null, res.rows[0]);
      }
    });
  }

  static findUserByEmail(email) {
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].email === email) {
        return userData[i];
      }
    }
    return null;
  }
}

module.exports = User;
