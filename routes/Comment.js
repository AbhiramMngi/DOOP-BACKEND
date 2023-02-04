const db = require('../database/database').db;
const router = require("express").Router();

router.post('/add', async function(req, res, next) {
  res.header('Content-Type', 'application/json');
  const { blogId, bloggerId, parentId, content } = req.body;
  const blogData = await db.blog.findFirst({
    where: {
      blog_id: blogId,
    }
  });
  if (!blogData) {
    res.status(404);
    res.send({
      status: 404,
      isError: true,
      message: 'blog Not Found'
    });
    return next();
  }
  const bloggerData = await db.blog.findFirst({
    where : {
      blogger_id: bloggerId,
    }
  });
// console.log("hello5");
  if (!bloggerData) {
    res.status(404);
    res.send({
      status: 404,
      isError: true,
      message: 'blogger Not Found'
    });
    return next();
  }

  const result =  db.comment.create({
    data: {
      blog_id: blogId,
      blogger_id: bloggerId,
      content: content,
      parent_id: parentId
    }
  });
  result
  .then((data) => {
    res.status(200);
    res.send({
      isError: false,
      message: "comment created successfully",
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
})

module.exports = {
  router: router
}