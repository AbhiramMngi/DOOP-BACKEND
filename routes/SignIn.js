const express = require("express");
const ctx = require("express-http-context");
const router = express.Router();
const hasher = require("../utils/encryptor").hasher;
const secret = process.env.SHA_SECRET_KEY;

router.post("/", async function (req, res, next) {
  const db = ctx.get("db");
  const enc = ctx.get("enc");
  res.header("Content-Type", "application/json");

  const { userNameorEmail, password } = req.body;
//   console.log(userNameorEmail);
  const record = await db.blogger.findFirst({
    where: {
      OR: [
        {
          email: {
            equals: userNameorEmail,
          },
        },
        {
          blogger_name: {
            equals: userNameorEmail,
          },
        },
      ],
    },
  });
  if (record == null) {
    res.status(404);
    res.send({
      status: 404,
      isError: true,
      message: "user not found",
    });
    return next();
  }
  if (hasher(password, enc, secret) !== record.pw_hash) {
    // console.log(hasher(password, enc, secret) + " is not " + record.pw_hash);
    res.status(401);
    res.send({
      status: 401,
      message: "invalid password",
      isError: true,
    });
    return next();
  }
  const blogs = await db.blog.findMany({
    where: {
      blogger_id: record.blogger_id,
    },
    take: 5,
    select: {
      blog_id: true,
      title: true,
      subtitle: true,
    },
  });
  console.log(blogs);
  res.status(200);
  res.send({
    status: 200,
    isError: true,
    message: "user successfully returned",
    data: {
      user_name: record.blogger_name,
      first_name: record.first_name,
      last_name: record.last_name,
      blogs: blogs,
    },
  });
  return next();
});

module.exports = {
  router: router,
};
