const PrismaClient = require("@prisma/client").PrismaClient;

let db = new PrismaClient();

module.exports = {
    db: db
}