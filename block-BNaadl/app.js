const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const articleRouter = require("./router/article");

//connect to mongo db 
mongoose.connect("mongodb://localhost/articles", err => {
    console.log("connected ", err ? false : true);
});

// view engine
app.set("view engine", "ejs");
app.set("views", path.join("views", ));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// home route
app.get("/", (req, res) => {
    res.send("Welcome to Blog");
});

// articles routes
app.use("/article", articleRouter);


app.listen(4444, () => console.log("connected to 4444"));