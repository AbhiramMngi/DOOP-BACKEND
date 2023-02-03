const ctx = require("express-http-context");
const PrismaClient = require("@prisma/client").PrismaClient;

const addDBToContext = (req, res, next) => {
  if (!ctx.get("db")) {
    ctx.set("db", new PrismaClient());
  }
  return next();
};

module.exports = {
  addDBToContext,
};
