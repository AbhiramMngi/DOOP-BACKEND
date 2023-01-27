const ctx = require("express-http-context");
const express = require("express");
const database = require("./middleware/database.middleware");
const http = require("http");
const signup = require("./routes/SignUp.js");

const app = express();
app.use(ctx.middleware);
app.use(database.addDBToContext);
app.use(express.json());
app.use("/signup", signup.router);

app.get("/", function (req, res) {
  res.header({
    "Content-Type": "application/json",
  });
  // console.log(res)
  res.send({
    message: "Welcome to blog doop",
  });
});

const PORT = process.env.PORT || 5000;
http.createServer(app).listen(PORT, function () {
  console.log(`server listening at ${PORT}`);
});
