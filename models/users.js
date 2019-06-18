const helper = require("../utils/helper");
const client = require("../services/connection");

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
    const result = this.findUserByEmail(user.email);
    result.then(emails => {
      if (emails.rows.length === 0) {
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
      } else {
        done("Duplicate Email", null);
      }
    });
  }

  static async findUserByEmail(email) {
    const result = await client
      .query(`SELECT * FROM users WHERE email='${email}'`)
      .catch(error => console.log(error));

    return result;
  }
}

module.exports = User;
