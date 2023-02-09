const express=require("express")
const router=express.Router()
const ctx = require("express-http-context");
const db = require('../database/database').db;
router.get("/:username",profilepage);

async function profilepage(req,res,next){
  const username=req.params.username;
  //console.log(username);
  //const db=ctx.get("db");
  const record = await db.blogger.findFirst({
    where: {
        blogger_name:username,
    },
  });
  console.log(record);
  if (record == null) {
    res.status(404);
    res.send({
      status: 404,
      isError: true,
      message: "user not found",
    });
    return next();
  }
  else{
    res.send(record);
  }
}
module.exports = {
    router: router,
}; 