const helper = require("../utils/helper");
const client = require("../services/connection");

const Car = require("../models/cars");

class Order {
  constructor(order) {
    this.id = helper.generateId();
    this.car = order.car;
    this.buyer = order.buyer;
    this.status = "pending"; // Default Status when Order is made
    this.price_offered = order.amount;
  }

  static async findById(order) {
    const result = await client
      .query(`SELECT * FROM orders WHERE id='${order}'`)
      .catch(error => console.log(error));

    return result;
  }

  static saveOrder(order, done) {
    let cars = Car.findById(order.car);

    cars
      .then(car => {
        if (car.rows.length === 0) {
          done("Incorrect Car", null);
        } else {
          if (car.rows[0].owner === order.buyer) {
            done("Buyer cant buy own car", null);
          } else {
            const query =
              "INSERT INTO orders(id, buyer, car, status, price_offered)VALUES($1,$2,$3,$4,$5) RETURNING *";
            const values = [
              order.id,
              order.buyer,
              order.car,
              order.status,
              order.price_offered
            ];

            client.query(query, values, (err, res) => {
              if (err) {
                done(err, null);
              } else {
                done(null, res.rows);
              }
            });
          }
        }
      })
      .catch(err => {
        done(err, null);
      });
  }

  static updateOrder(order_id, order, done) {
    let queryType = order.status ? "status" : "price_offered";
    let value = order.status ? order.status : order.amount;

    let priceQuery = `UPDATE orders SET ${queryType} = '${value}' WHERE id = '${order_id}' AND buyer = '${order.token.userId}' RETURNING *`;

    let statusQuery = `UPDATE orders SET ${queryType} = '${value}' WHERE id = '${order_id}'RETURNING *`;

    let query = order.status ? statusQuery : priceQuery;

    client.query(query, (err, res) => {
      if (err) {
        done(err, null);
      } else {
        done(null, res.rows);
      }
    });
  }

  static getOrders(done) {
    let query = `SELECT * FROM orders`;
    client.query(query, (err, res) => {
      if (err) {
        done(err, null);
      } else {
        done(null, res.rows);
      }
    });
  }
}

module.exports = Order;
