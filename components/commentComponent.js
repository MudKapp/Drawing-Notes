const 
    Note = require('../models/note.js')

create = (req,res)=>{
    res.render('comment/create',{id:req.params.id})
}

store = (req,res)=>{
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        Note.findById(req.params.id)
        .then(note=>{
            note.comments.push({
                author: req.body.author,
                body: req.body.body
            })
            note.save(function (err) {
                if (!err) console.log('Success!');
              });
            res.render('show',{note})
        })
        .catch(err=>console.log(err))
      }

}

del = async (req,res) =>{
    const note = await Note.findById(req.params.id)
    const comment = await note.comments.id(req.params.commentId)
    comment.remove()
    note.save()
    res.json({redirect:'/notes/'+req.params.id})
}


module.exports = {create, store,del}