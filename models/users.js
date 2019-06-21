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

  static logInUser(authenticatingUser, done) {
    const result = this.findUserByEmail(authenticatingUser.email);

    result
      .then(emails => {
        if (emails.rows.length !== 0) {
          let user = emails.rows;

          const authenticate = helper.decrypt(
            user[0].password,
            authenticatingUser.password
          );

          //Removing Password Field
          delete user[0].password;

          if (authenticate) {
            user[0].token = helper.generateToken(user[0]);
            done(null, user);
          } else {
            done("Incorrect Password", null);
          }
        } else {
          done("Invalid Email", null);
        }
      })
      .catch(err => {
        done("Something went wrong", null);
      });
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
            done(null, res.rows);
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

  static async getUsers() {
    const result = await client
      .query(`SELECT * FROM users`)
      .catch(error => console.log(error));

    return result;
  }

  /**Runs only once at */
  static makeAdmin(user, done) {
    const query =
      "INSERT INTO users(id, first_name, last_name, email, password, address, is_admin)VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *";
    const values = [
      helper.generateId(),
      "Admin",
      "Admin",
      user.email,
      helper.encrypt(user.password),
      "Admin Address",
      true
    ];

    client.query(query, values, (err, res) => {
      if (err) {
        done(err, null);
      } else {
        done(null, res.rows[0]);
      }
    });
  }
}

module.exports = User;
