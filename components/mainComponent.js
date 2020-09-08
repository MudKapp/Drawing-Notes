const { uploader } = require('../cloudinaryConfig.js')

const
    path = require('path'),
    DatauriParser = require('datauri/parser'),
    parser  = new DatauriParser(),
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
    const encodedFile = parser.format(path.extname(req.file.originalname).toString(),req.file.buffer)
    const file = encodedFile.content
    uploader.upload(file).then((result)=>{
        const image = result.url;
        Note.create({
            title: req.body.title,
            image: image,
            notes: req.body.notes
        })
        res.redirect('/')
    })

}

edit = (req,res) =>{
    Note.findById(req.params.id).then(note=>{
        res.render('edit',{note})
    })
    
}

update = (req,res) =>{
    Note.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        notes: req.body.notes
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