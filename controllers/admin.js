import User from "../models/users";
import Response from "../utils/response";

export let createAdmin = (req, res, next) => {
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

export let refreshDb = (req, res, next) => {};
