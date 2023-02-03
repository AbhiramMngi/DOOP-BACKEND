const ctx = require("express-http-context");
const crypto = require("crypto");

const addEncryptor = (req, res, next) => {
  if (!ctx.get("enc")) ctx.set("enc", crypto.createHash);
  return next();
};

module.exports = {
  addEncryptor: addEncryptor,
};
