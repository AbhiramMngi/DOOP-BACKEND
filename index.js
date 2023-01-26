const ctx = require("express-http-context");
const express = require("express");
const database = require("./middleware/database.middleware");
const http = require("http");
// const signup = require("routes/SignUp.js")

const app = express();
app.use(ctx.middleware);
app.use(database.addDBToContext);

app.get("/", async function (req, res) {
    const db = ctx.get("db");
    const data = await db.blogger.findMany();

  res.header({
    "Content-Type": "application/json",
  });
  res.send({
    Status: 200,
    message: data,
  });
});

const PORT = process.env.PORT || 5000;
http.createServer(app).listen(PORT, function () {
  console.log(`server listening at ${PORT}`);
});
