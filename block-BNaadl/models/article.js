const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    tags: String,
    author: String,
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0}
}, {timestamps: true});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;