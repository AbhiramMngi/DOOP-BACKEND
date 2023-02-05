const express = require("express");
const router = express.Router();
const db = require("../database/database").db;

router.post("/new", publishBlog); 
router.put("/edit",editBlog);
router.delete("/delete",deleteBlog);

async function publishBlog(req,res,next){      
    console.log(req.body);
    const{blogger_id,title,subtitle,blog_content} = req.body;

    const record = await db.blogger.findFirst({
        where:{
            blogger_id:blogger_id
        }
    });
    if(record == null){
        res.status(404);
        res.send({
            isError: true,
            message: "user doesnt exist",
            status: 404
        });
        return next();
    }
    
    const data = db.blog.create({
        data:{
            // // blog_id:blog_id,
            // blogger_id: blogger_id, //add blogger_id to current blog
            // title: title,
            // subtitle: subtitle,
            // content: {}
            blogger_id:"a0148ea0-24c9-46c6-b532-b08143e580e4", title:"heylo", subtitle:"ab", content: "{ 'text':'ef ef' }"
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
            return next();
        })
        .catch ((err)=>{
            console.log(err)
            res.status(500);
            res.send({
                isError: true,
                message: err,
                status: 500,
            });
            return next();
        });
    
}
    

async function editBlog(req,res,next){    
    console.log(req.body);
    const{blog_id,blogger_id} = req.body;

    const record = await db.blogger.findFirst({
        where:{
            blog_id: blog_id,
        }
    });
    if(record == null){
        res.status(404);
        res.send({
            isError: true,
            message: "user doesnt exist",
            status: 404
        });
        return next();
    }
        
    const data =  db.blog.update({
        where: {
          blog_id: blog_id,
        },
        data: {
          conent: req.body.content,
          title: req.body.title,
          subtitle: req.body.subtitle,
        },
      });

    data
        .then((data)=>{
            res.status(200);
            res.send({
                isError: false,
                message: "blog updated",
                status: 200
            });
            return next();
        })
        .catch ((err)=>{
            res.status(500);
            res.send({
                isError: true,
                message: err,
                status: 500,
            });
            return next();
        });
    
}
    
async function deleteBlog(req,res,next){      
    console.log(req.body);
    const{blog_id,blogger_id} = req.body;

    const record = await db.blogger.findFirst({
        where:{
            blogger_id:blogger_id
            //validate blog owner
        }
    });
    if(record == null){
        res.status(404);
        res.send({
            isError: true,
            message: "user doesnt exist",
            status: 404
        });
        return next();
    } 

    const data =  db.blog.delete({
        where: {
          blog_id: blog_id,
          blogger_id: blogger_id,
        },
      });

    data
        .then((data)=>{
            res.status(200);
            res.send({
                isError: false,
                message: "blog deleted",
                status: 200
            });
            return next();
        })
        .catch ((err)=>{
            console.log(err)
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
    


