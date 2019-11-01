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

  static customResponse(res, status, message, data) {
    return res.status(status).json({ status, message, data });
  }

  static serverError(res, message) {
    return res
      .status(500)
      .json({ status: 500, message, error: "Server Error" });
  }

  static authenticationError(res, message) {
    return res
      .status(401)
      .json({ status: 401, message, error: "Authentication Error" });
  }

  static authorizationError(res, message) {
    return res
      .status(403)
      .json({ status: 403, message, error: "Authorization Error" });
  }

  static notFoundError(res, message) {
    return res.status(404).json({ status: 400, message, error: "Not Found" });
  }

  static conflictError(res, message) {
    return res
      .status(409)
      .json({ status: 409, message, error: "Conflict Error" });
  }
}

export default Response;
