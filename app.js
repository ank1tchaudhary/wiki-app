const ejs = require("ejs");
const express = require("express");
const mongo = require("mongoose");
const bodyParser = require("body-parser");
const { query } = require("express");
mongo.connect("mongodb://127.0.0.1:27017/WikiDB");
const app = express();
app.set("view engin","ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));



const articles = {
    title : String,
    content : String
}

const Article = mongo.model("Article",articles);

app.route("/article")
    .get((req,res)=>{
        Article.find({},(err,data)=>{
            if(!err){
                res.send(data);
            }
        });
    })
    .post((req,res)=>{
        const title = req.body.title;
        const content = req.body.content;
    
        const article = new Article({
            title : title,
            content : content
        });
    
        article.save((err)=>{
            if(!err){
                res.send(article);
            }else{
                res.send(err);
            }
        });
    })
    .delete((req,res)=>{
        Article.deleteMany((err)=>{
            if(err){
                res.send(err);
            }else{
                res.send("Successfully deleted record.")
            }
        });
        const id = req.body.id;
        if(id){
        
        }else{
            
        }
    });



    app.route("/article/:articleTitle")
        .get((req,res)=>{
            Article.findOne({title : req.params.articleTitle},(err,data)=>{
                if(!err){
                    res.send(data);
                }else{
                    res.send(err);
                }
            });
        })
        .delete((req,res)=>{
            Article.deleteOne({title:req.params.articleTitle},(err)=>{
                if(err){
                    res.send(err);
                }else{
                    res.send("Successfully deleted record.")
                }
            });
        })
        .put((req,res)=>{
            Article.findOneAndUpdate({title: req.params.articleTitle},{title:req.body.title, content:req.body.content},{overwrite:true},(err)=>{
                if(!err){
                    res.send("Updated Succesfully.");
                }else{
                    res.send(err);
                }
            });
        })
        .patch((req,res)=>{
            Article.findOneAndUpdate({title : req.params.articleTitle},{$set : req.body},(err)=>{
                if(!err){
                    res.send("Updated Succesfully.");
                }else{
                    res.send(err);
                }
            })
        })
        // .patch((req,res)=>{
        //     Article.findOneAndUpdate({title: req.params.articleTitle},{title:req.body.title, content:req.body.content},{overwrite:false},(err)=>{
        //         if(!err){
        //             res.send("Updated Succesfully.");
        //         }else{
        //             res.send(err);
        //         }
        //     })
        // });


app.listen(3000,()=>{
    console.log("listening to 3000");
})