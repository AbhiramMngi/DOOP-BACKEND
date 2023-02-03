function hashPassword(password, enc, key) {
  return enc("sha256", key).update(password).digest("hex");
}
module.exports = {
  hasher: hashPassword,
};
