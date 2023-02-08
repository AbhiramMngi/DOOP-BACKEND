const express = require("express");
const router = express.Router();
const db = require("../database/database").db;

router.post("/new", publishBlog); 
router.put("/edit",editBlog);
router.delete("/delete",deleteBlog);

async function publishBlog(req,res,next){      
    console.log(req.body);
    const{blogger_id,title,subtitle,content} = req.body;

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
            blogger_id: blogger_id, //add blogger_id to current blog
            title: title,
            subtitle: subtitle,
            content: content            
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
            // console.log(err)
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

    const record = await db.blog.findFirst({
        where:{
            blog_id: blog_id,
        }
    });
    if(record == null){
        res.status(404);
        res.send({
            isError: true,
            message: "blog not found",
            status: 404
        });
        return next();
    }
        
    const data =  db.blog.update({
        where: {
          blog_id: blog_id,
        },
        data: {
          content: req.body.content,
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
    
async function deleteBlog(req,res,next){      
    console.log(req.body);
    const{blog_id} = req.body;

    const record = await db.blog.findFirst({
        where:{
            blog_id:blog_id            
        }
    });
    if(record == null){
        res.status(404);
        res.send({
            isError: true,
            message: "blog doesnt exist",
            status: 404
        });
        return next();
    } 

    const data =  db.blog.delete({
        where: {
          blog_id: blog_id          
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
    


