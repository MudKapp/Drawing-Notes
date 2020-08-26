const 
    mongoose = require('mongoose'),
    commentSchema = require('./comment.js')
    Schema   = mongoose.Schema,
    noteSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        notes: String,
        comments: [commentSchema]
    },{timestamps: true})

module.exports = mongoose.model('Note',noteSchema)