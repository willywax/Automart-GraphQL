const User = require("../models/users");
const Response = require("../utils/response");

exports.createAdmin = (req, res, next) => {
  //const newUser = new User(req.body);

  User.makeAdmin(req.body, (err, user) => {
    if (err) {
      res
        .status(404)
        .json(new Response(404, null, err, "Admin create Failed").response());
    } else {
      res
        .status(201)
        .json(new Response(201, user, null, "Admin Succcessfully").response());
    }
  });
};
