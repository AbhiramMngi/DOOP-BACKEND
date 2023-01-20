const ctx = require("express-http-context");
const express = require("express");
const database = require("./middleware/database.middleware");
const http = require("http");
// const signup = require("routes/SignUp.js")

const app = express();
app.use(ctx.middleware);
app.use(database.addDBToContext);

app.get("/", function (req, res){
    res.header({
        "Content-Type": "application/json"
    })
    res.send({
        Status: 200,
        message: "Welcome to doop backend"
    })
})

http.createServer(app).listen(8000, function(){
    console.log("server listening at 8000");
})