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

/**
 * This function allow you to modify a JS Promise by adding some status properties.
 * Based on: http://stackoverflow.com/questions/21485545/is-there-a-way-to-tell-if-an-es6-promise-is-fulfilled-rejected-resolved
 * But modified according to the specs of promises : https://promisesaplus.com/
 */
exports.MakeQuerablePromise = promise => {
  // Don't modify any promise that has been already modified.
  if (promise.isResolved) return promise;

  // Set initial state
  var isPending = true;
  var isRejected = false;
  var isFulfilled = false;

  // Observe the promise, saving the fulfillment in a closure scope.
  var result = promise.then(
    function(v) {
      isFulfilled = true;
      isPending = false;
      return v;
    },
    function(e) {
      isRejected = true;
      isPending = false;
      throw e;
    }
  );

  result.isFulfilled = function() {
    return isFulfilled;
  };
  result.isPending = function() {
    return isPending;
  };
  result.isRejected = function() {
    return isRejected;
  };
  return result;
};
