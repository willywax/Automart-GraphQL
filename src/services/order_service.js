import database from "../database/models";

const { Orders } = database;

class OrderService {
  static async findOrder(params) {
    try {
      console.log(params);
      let orders = await Orders.findAll({ where: params });
      return orders;
    } catch (error) {
      throw error;
    }
  }

  static async saveOrder(order) {
    try {
      console.log(order);
      return await Orders.create(order);
    } catch (error) {
      throw error;
    }
  }

  static async updateOrder(newOrder, params) {
    try {
      let updatedOrder = Orders.update(newOrder, {
        where: params,
        returning: true
      });

      return updatedOrder;
    } catch (error) {
      throw error;
    }
  }

  static async deleteOrder(params) {
    try {
      return await Orders.destroy({ where: params });
    } catch (error) {
      throw error;
    }
  }
}

export default OrderService;
