// for document embedding example only
// use blogPostModel for db architecture model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  // content: String,
  // createdAt: date
});

module.exports = PostSchema;