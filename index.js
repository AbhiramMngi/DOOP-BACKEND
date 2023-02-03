const ctx = require("express-http-context");
const express = require("express");
const database = require("./middleware/database.middleware");
const encryptor = require("./middleware/encryptor.middleware");
const http = require("http");
const crypto = require("crypto");

const signup = require("./routes/SignUp.js");
const signin = require("./routes/SignIn.js");


const app = express();
app.use(ctx.middleware);
app.use(database.addDBToContext);
app.use(encryptor.addEncryptor)
app.use(express.json());
app.use("/signup", signup.router);
app.use("/signin", signin.router);


app.get("/", function (req, res) {
  res.header({
    "Content-Type": "application/json",
  });
  res.send({
    message: "Welcome to blog doop",
  });
});

const PORT = process.env.PORT || 5000;
http.createServer(app).listen(PORT, function () {
  console.log(`server listening at ${PORT}`);
});
