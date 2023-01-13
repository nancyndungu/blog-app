const express = require("express")
const router = express.Router()
const DB = require ("../database/connection.js")

router.get("/",(req,res)=>{
    DB.query("SELECT * FROM blogs",(err, blogPost) =>{
        if(err){
            throw err
        }else{
            res.render("home.ejs", {blogPost})
        }

    })

})
router.get("/create",(req,res)=>{
    res.render("create.ejs")

})
router.post("/create",(req,res)=>{
    const blogPost = {
        title : req.body.title,
        description: req.body.description
    }
    DB.query(`INSERT INTO blogs SET ?`, blogPost, (err,result)=>{
        if (err){
            throw err
        }else{
            res.redirect(`/`)
        }
    })
    
})

router.get("/read/:id", (req,res)=>{
    const id = req.params.id
    DB.query(`SELECT * FROM blogs WHERE id="${req.params.id}" LIMIT 1`,(err, blog)=>{
        if(err){
            throw err
        }
        DB.query(`SELECT * FROM comments WHERE blog_id="${req.params.id}"`,(err, comments)=>{
            if(err){
                throw err
            }
            res.render("read.ejs", {blog, comments})
        })
    
    })
    
})

router.get("/comment/:id", (req,res)=>{
    DB.query(`SELECT * FROM blogs WHERE id="${req.params.id}" LIMIT 1`,(err, blog)=>{
        if(err){
            console.log(err)
        }else{
            res.render("comment.ejs", {blog})
        }
    })

})

router.post("/read/:id/comment", (req, res) => {
    const comment =  {
        blog_comment: req.body.blog_comment,
        blog_id:req.params.id
    }
    DB.query(`INSERT INTO comments SET ?`, comment, (err,result)=>{
            if (err){
                console.log(err)
            }else{
                res.redirect(`/read/${req.params.id}`)
            }
        })
})

router.put("/comment/:id", (req,res)=>{
    const post= req.body
    const id = req.params.id
    DB.query(`UPDATE blogs
           SET title = ${prevent.escape(post.title)},
           description = ${prevent.escape(post.description)},
           created=${prevent.escape(post.created)}
           WHERE ID = "${id}"`,(err, result)=>{
            if (err){
                console.log(err)
            }else{
                console.log("Comented")
                res.redirect("/")
            }

           }
    )
})
router.get("/delete/:id", (req,res)=>{
    const id =req.params.id
    DB.query(`DELETE FROM blogs WHERE id="${id}"`,(err,result)=>{
        if (err){
            console.log(err)
        }else{
            console.log("Deleted")
            res.redirect("/")
        }
    })
})
module.exports =router