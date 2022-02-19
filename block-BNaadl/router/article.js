const express = require("express");
const router = express.Router();
const Article = require("../models/article");

router.get("/", (req, res) => {
    Article.find({}, (err, articles) => {
        if(err){
            res.send("There is some error");
            return;
        }
        res.render("allArticles", { articles });
    });
});

// Form to create an article
router.get("/new", (req, res) => {
  res.render("createArticle");
});

router.post("/new", (req, res) => {
  Article.create(req.body, (err, article) => {
      if(err){
          res.send("There is some error");
          return;
      }
    res.redirect("/article/");
  });
});

router.get("/:id", (req, res) => {
    const articleId = req.params.id;
    Article.findById(articleId, (err, article) => {
        if(err){
            res.send("There is some error");
            return;
        }
        article = article.toObject();
        article.formattedDate = new Date().toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'});
        res.render("showFullArticle", { article })
    })
})

router.put("/:id", (req, res) => {
    const articleId = req.params.id;
    Article.findById(articleId, (err, article) => {
        if(err){
            res.send("There is some error");
            return;
        }
        article = article.toObject();
        article.likes = article.likes + 1;
        Article.findByIdAndUpdate({_id: article._id} , article, (err, updatedArticle) => {
            if(err){
                res.send("There is some error");
                return;
            }
            Article.findById(updatedArticle._id, (err, articleFetchedAgain) => {
                if(err){
                    res.send("There is some error");
                    return;
                }
                res.json({likes: articleFetchedAgain.likes});
            });
        });
    });
});

module.exports = router;
