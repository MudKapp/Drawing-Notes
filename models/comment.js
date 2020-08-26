const
    mongoose = require('mongoose'),
    Schema = mongoose.Schema
    commentSchema = new Schema({
        author: String,
        body: String
    },{timestamps: true})

module.exports = commentSchema