const express=require("express")
const router=express.Router()
const ctx = require("express-http-context");
const db = require('../database/database').db;
router.get("/",home);

async function home(req,res,next){
    const records=await db.blog.findMany({
        take: 20,
        select: {
            title: true,
            blogger_blog :{
                select:{
                blogger_name: true
                },
            },
            subtitle:true,
            createdAt:true, 
        },
        orderBy: {
            createdAt:"desc",
        },
    })
    if(records==null){
        res.status(404);
        res.send({
        status: 404,
        isError: true,
        message: "no blogs found",
        });
        return next();
    }
    else
        res.send(records);
}
module.exports = {
    router: router,
}; 