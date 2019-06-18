const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
