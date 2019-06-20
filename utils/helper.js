const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Response = require("./response");
const dotenv = require("dotenv");
dotenv.config();

/** Method to Generate Unique UUUID */
exports.generateId = () => {
  return uuid.v1();
};

/** Method to encrypt passwords */
exports.encrypt = value => {
  const hash = bcrypt.hashSync(value, 10);
  return hash;
};

/** Method to decrypt passwords */
exports.decrypt = (hash, value) => {
  if (bcrypt.compareSync(value, hash)) {
    return true;
  }
  return false;
};

/**Method for siging token */
exports.generateToken = user => {
  const token = jwt.sign(
    { userId: user.id, role: user.is_admin },
    process.env.SECRET_KEY,
    {
      expiresIn: "24h"
    }
  );

  return token;
};
/** Saving */

exports.decodeToken = token => {
  const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

  return decodeToken;
};

/**Handles Error Message if incorrect route or method */
exports.getError = (req, res) => {
  const url = req.method + " " + req.protocol + "://" + req.hostname + req.url;
  res
    .status(405)
    .json(
      new Response(405, url, null, "Incorrect method or Invalid path Found")
    );
};
