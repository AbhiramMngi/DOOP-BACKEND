const express = require("express");
const router = express.Router();
const ctx = require("express-http-context");
const hasher = require("../utils/encryptor").hasher;
router.post("/", signUp);
const secret = process.env.SHA_SECRET_KEY;

async function signUp(req, res, next) {
  const db = ctx.get("db");
  const enc = ctx.get("enc");

  res.header("Content-Type: application/json");

  // console.log(req.body);

  const { email, password, firstName, lastName, bloggerName } = req.body;

  let record = await db.blogger.findFirst({
    where: {
      email: email,
    },
  });
  if (record != null) {
    res.status(200);
    res.send({
      isError: true,
      status: 400,
      message: "user already exists",
    });
    return next();
  }
  record = await db.blogger.findFirst({
    where: {
      blogger_name: bloggerName,
    },
  });

  if (record != null) {
    res.status(400);
    res.send({
      isError: true,
      message: "User Name taken",
      status: 400,
    });
    return next();
  }
  const data = db.blogger.create({
    data: {
      email: email,
      first_name: firstName,
      last_name: lastName,
      pw_hash: hasher(password, enc, secret),
      blogger_name: bloggerName,
    },
  });

  data
    .then((data) => {
      res.status(200);
      res.send({
        isError: false,
        message: "user signed up",
        status: 200,
      });
      return next();
    })
    .catch((err) => {
      res.status(500);
      res.send({
        isError: true,
        message: err,
        status: 500,
      });
      return next();
    });
}

module.exports = {
  router: router,
};
