/**Class For Handling Responses */
class Response {
  constructor(status, data, error, message) {
    (this.status = status),
      (this.data = data),
      (this.error = error),
      (this.message = message);
  }
  response() {
    const res = {};
    res.status = this.status;
    if (this.data !== null) {
      res.data = this.data;
    }
    if (this.error !== null) {
      res.error = this.error;
    }
    res.message = this.message;

    return res;
  }
}

export default Response;
