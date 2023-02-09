const ctx = require("express-http-context");
const express = require("express");
const encryptor = require("./middleware/encryptor.middleware");
const http = require("http");

const signup = require("./routes/SignUp.js");
const signin = require("./routes/SignIn.js");
const findBlog = require("./routes/FindBlog.js");
const Comment = require("./routes/Comment.js");
const profilepage=require("./routes/ProfilePage.js");
const home=require("./routes/Home.js");

const app = express();

app.use(ctx.middleware);
app.use(encryptor.addEncryptor);
app.use(express.json());

app.use("/signup", signup.router);
app.use("/signin", signin.router);
app.use("/blog", findBlog.router);
app.use("/comment", Comment.router);
app.use("/profilepage",profilepage.router);
app.use("/home",home.router);

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
