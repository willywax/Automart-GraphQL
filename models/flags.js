const flagData = [];

class Flag {
  constructor(car, reason, description) {
    this.id = this.generateId();
    this.car_id = this.car;
    this.created_on = new Date();
    this.reason = reason;
    this.description = description;
  }

  static saveFlag(flag) {
    this.flagData.push(flag);

    return flagData[flagData.length - 1];
  }

  static getFlags() {
    return flagData;
  }

  generateId() {
    return uuid.v1();
  }
}

module.exports = Flag;
