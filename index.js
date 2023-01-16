const ctx = require("express-http-context");
const express = require("express");
const database = require("./middleware/database.middleware");
const http = require("http");
const { PrismaClient } = require("@prisma/client");

const app = express();
app.use(ctx.middleware);
app.use(database.addDBToContext);

