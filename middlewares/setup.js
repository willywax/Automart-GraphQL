import User from "../models/users";
import Response from "../utils/response";

export let users = (req, res, next) => {
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

export let admin = (req, res, next) => {
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
