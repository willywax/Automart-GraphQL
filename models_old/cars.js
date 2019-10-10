import { generateId } from "../utils/helper";
import { selectQuery, deleteQuery, insertQuery } from "../utils/queries";

import client from "../services/connection";

class Car {
  constructor(car) {
    this.id = generateId();
    this.owner = car.token.userId;
    this.state = car.state;
    this.status = "available";
    this.price = car.price;
    this.manufacturer = car.manufacturer;
    this.model = car.model;
    this.body_type = car.body_type;
    this.primary_image = "image.jpg";
  }

  static async saveCar(car, done) {
    const query =
      "INSERT INTO cars(id,owner,state,status,price,model,manufacturer,body_type,primary_image) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *";

    const values = [
      car.id,
      car.owner,
      car.state,
      car.status,
      car.price,
      car.model,
      car.manufacturer,
      car.body_type,
      car.primary_image
    ];

    try {
      let car = await insertQuery("cars", values);
      return car;
    } catch (error) {
      throw error;
    }

    // client.query(query, values, (err, res) => {
    //   if (err) {
    //     done([err], null);
    //   } else {
    //     done(null, res.rows);
    //   }
    // });
  }

  static searchCars(queries, done) {
    let query = "SELECT * FROM cars";

    client.query(query, (err, res) => {
      if (err) {
        done([err], null);
      } else {
        let cars = Object.keys(queries).length
          ? this.filterCars(queries, res.rows)
          : res.rows;
        done(null, cars);
      }
    });
  }

  static async findById(car_id) {
    let cars = await selectQuery("cars", "id", car_id);

    return cars;
  }

  static updateOne(car_id, car, done) {
    let queryType = car.status ? "status" : "price";
    let value = car.status ? car.status : car.price;

    let query = `UPDATE cars SET ${queryType} = '${value}' WHERE id = '${car_id}' AND owner='${car.token.userId}' RETURNING *`;

    client.query(query, (err, res) => {
      if (err) {
        done(err, null);
      } else {
        done(null, res.rows);
      }
    });
  }

  static filterCars(queries, carData) {
    const keys = Object.keys(queries);
    const cars = [];
    for (let i = 0; i < carData.length; i++) {
      let found = false;
      for (const key of keys) {
        if (key === "min_price" && queries.min_price <= carData[i].price) {
          found = true;
        } else if (
          key === "max_price" &&
          queries.max_price >= carData[i].price
        ) {
          found = true;
        } else if (carData[i][key] === queries[key]) {
          found = true;
        } else {
          found = false;
          break;
        }
      }
      if (found) {
        cars.push(carData[i]);
      }
    }

    return cars;
  }

  static async deleteOne(car, done) {
    let cars = deleteQuery("cars", "id", car);
    return cars;
  }
}

export default Car;
