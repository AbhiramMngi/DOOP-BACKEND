const express = require("express");
const router = express.Router();
const ctx = require("express-http-context");
router.post("/new", publishBlog); 
router.put("/edit/:blogid",editBlog);
router.delete("/delete/:blogid",deleteBlog);

async function publishBlog(req,res,next){
    const db = ctx.get("db");    
    console.log(req.body);
    const{blogger_id,title,blog_content} = req.body;

    const record = await db.blogger.findFirst({
        where:{
            blogger_id:blogger_id
        }
    });
    if(record == null){
        res.status(500);
        res.send({
            isError: true,
            message: "user doesnt exist",
            status: 500
        });
        next();
    }
    
    const data = db.blog.create({
        data:{
            blog_id:blog_id,
            // blogger_blog.blogger_id: blogger_id, //add blogger_id to current blog
            title: title,
            content: blog_content
        }
    });

    data
        .then((data)=>{
            res.status(200);
            res.send({
                isError: false,
                message: "blog uploaded",
                status: 200
            });
            next();
        })
        .catch ((err)=>{
            res.status(500);
            res.send({
                isError: true,
                message: err,
                status: 500,
            });
            next();
        });
    
}
    

async function editBlog(req,res,next){
    const db = ctx.get("db");    
    console.log(req.body);
    const{blog_id,blogger_id} = req.body;

    const record = await db.blogger.findFirst({
        where:{
            blogger_id:blogger_id
            //validate blog owner
        }
    });
    if(record == null){
        res.status(500);
        res.send({
            isError: true,
            message: "user doesnt exist",
            status: 500
        });
        next();
    }
    
    const data = db.blog.create({
        data:{
            blog_id:blog_id,
            // blogger_blog.blogger_id: blogger_id, //add blogger_id to current blog
            title: title,
            content: blog_content
        }
    });

    data
        .then((data)=>{
            res.status(200);
            res.send({
                isError: false,
                message: "blog updated",
                status: 200
            });
            next();
        })
        .catch ((err)=>{
            res.status(500);
            res.send({
                isError: true,
                message: err,
                status: 500,
            });
            next();
        });
    
}
    
async function deleteBlog(req,res,next){
    const db = ctx.get("db");    
    console.log(req.body);
    const{blog_id,blogger_id} = req.body;

    const record = await db.blogger.findFirst({
        where:{
            blogger_id:blogger_id
            //validate blog owner
        }
    });
    if(record == null){
        res.status(500);
        res.send({
            isError: true,
            message: "user doesnt exist",
            status: 500
        });
        next();
    }
    
    const data = db.blog.delete({
        data:{
            blog_id:blog_id,
            // blogger_blog.blogger_id: blogger_id, //add blogger_id to current blog
            title: title,
            content: blog_content
        }
    });

    data
        .then((data)=>{
            res.status(200);
            res.send({
                isError: false,
                message: "blog deleted",
                status: 200
            });
            next();
        })
        .catch ((err)=>{
            res.status(500);
            res.send({
                isError: true,
                message: err,
                status: 500,
            });
            next();
        });
    
}
    
    
module.exports = {
    router: router,
};
    


