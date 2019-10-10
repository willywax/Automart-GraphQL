import uuid from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Response from "./response";
import dotenv from "dotenv";

dotenv.config();

/** Method to Generate Unique UUUID */
export let generateId = () => {
  return uuid.v1();
};

/** Method to encrypt passwords */
export let encrypt = value => {
  const hash = bcrypt.hashSync(value, 10);
  return hash;
};

/** Method to decrypt passwords */
export let decrypt = (hash, value) => {
  if (bcrypt.compareSync(value, hash)) {
    return true;
  }
  return false;
};

/**Method for siging token */
export let generateToken = user => {
  //let role =
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

export let decodeToken = token => {
  const decodeToken = jwt.verify(token, process.env.SECRET_KEY);

  return decodeToken;
};

/**Handles Error Message if incorrect route or method */
export let getError = (req, res) => {
  const url = req.method + " " + req.protocol + "://" + req.hostname + req.url;

  res
    .status(405)
    .json(
      new Response(405, url, null, "Incorrect method or Invalid path Found")
    );
};

/** REmoved Fields or key from objects*/
export let removeKeys = (obj, keyArray) => {
  //let pair = keyArray
  for (let i = 0; i < keyArray.length; i++) {
    delete obj[keyArray[i]];
  }

  return obj;
};
