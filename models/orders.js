const uuid = require("uuid");

const Car = require("./cars");

const orderData = [];

class Order {
  constructor(buyer, car, amount) {
    this.id = this.generateId();
    this.car = car;
    this.created_on = new Date();
    this.buyer = buyer;
    this.status = "pending"; // Default Status when Order is made
    this.price_offered = amount;
  }

  static findById(order) {
    let result = null;
    for (let i = 0; i < orderData.length; i++) {
      if (order === orderData[i].id) {
        result = orderData[i];
        break;
      }
    }
    if (result !== null) {
      const car = Car.findById(result.car);
      result.price = car !== null ? car.price : "None";
    }
    return result;
  }

  static saveOrder(order) {
    orderData.push(order);

    // Return last saved Record
    return orderData[orderData.length - 1];
  }

  static updateOrder(order) {
    let result = null;
    for (let i = 0; i < orderData.length; i++) {
      if (order.id === orderData[i].id) {
        orderData[i] = order;
        result = order;
        break;
      }
    }
    return result;
  }

  static getOrders() {
    return orderData;
  }

  static getOrdersByUser(user_id) {
    let result = [];
    for (let i = 0; i < orderData.length; i++) {
      if (user_id === orderData[i].buyer) {
        result.push(orderData[i]);
      }
    }
    return result;
  }

  generateId() {
    return uuid.v1();
  }
}

module.exports = Order;
