const 
    Note = require('../models/note.js'),
    
index = async (req,res)  =>{
    const notes = await Note.find()
    res.render('index',{notes})
}

show = async (req,res) =>{
    const note = await Note.findById(req.params.id)
    res.render('show',{note})
}

create = (req,res) => {
    res.render('create')
}



store = (req,res) => {
    const file = req.file
    const str = file.path
    const filePath = str.substr(6)
    Note.create({
        title: req.body.title,
        image: filePath,
        note: req.body.notes
    })
    res.redirect('/')
}

edit = (req,res) =>{
    Note.findById(req.params.id).then(note=>{
        res.render('edit',{note})
    })
    
}

update = (req,res) =>{
    const file = req.file
    const str = file.path
    const filePath = str.substr(6)
    Note.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        image: filePath,
        note: req.body.notes
    })
    .then(()=>{res.json({redirect:'/notes/'+req.params.id})})
    .catch(err=>console.log(err))
}

del = (req,res) => {
        Note.findOneAndDelete({_id:req.params.id})
        .then(()=>{res.json({redirect:'/notes'})})
        .catch(err=>console.log(err))
        
    }

module.exports = {index,show,create,edit,update,store,del}