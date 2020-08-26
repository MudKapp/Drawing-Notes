const routes = require('./mainRoutes');

const 
    express = require('express'),
    commentRoutes   = express.Router()
    commentComponent = require('../components/commentComponent.js')



    commentRoutes.get('/notes/:id/comments/create',(req,res)=>commentComponent.create(req,res))
    commentRoutes.post('/notes/:id/comments/store',(req,res)=>commentComponent.store(req,res))
    commentRoutes.delete('/notes/:id/comments/:commentId/delete',(req,res)=>commentComponent.del(req,res))

module.exports = commentRoutes