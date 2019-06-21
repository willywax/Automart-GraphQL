const User = require("../models/users");
const Response = require("../utils/response");

exports.users = (req, res, next) => {
  //Check if any user in the system
  let results = User.getUsers();

  results
    .then(users => {
      if (users.rows.length === 0) {
        res.status(403).json(new Response(403, [], [], "System Not Setup"));
      } else {
        next();
      }
    })
    .catch(err => {
      res.status(500).json(new Response(500, [], [], "Internal Server Error"));
    });
};

exports.admin = (req, res, next) => {
  //Check if any user in the system
  let results = User.getUsers();

  results
    .then(users => {
      if (users.rows.length === 0) {
        next();
      } else {
        res.status(401).json(new Response(401, [], null, "Not Allowed"));
      }
    })
    .catch(err => {
      res.status(500).json("Server Error");
    });
};
