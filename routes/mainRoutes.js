const    
    express         = require('express'),
    mainRoutes          = express.Router(),
    mainComponent = require('../components/mainComponent.js'),
    multer = require('multer'),
    storage = multer.memoryStorage(),
    upload = multer({
      limits:{
        fileSize: 3000000
      },
      storage,
      fileFilter: (req, file, cb) =>{
        regex = RegExp('image/*')
        if(regex.test(file.mimetype)){
          cb(null,true)
        }else{
          cb(null,false)
          cb(new Error('Wrong file type!'))
        }
      }
     }).single('image')
     

     mainRoutes.get('/',(req,res)=>mainComponent.index(req,res))
     mainRoutes.get('/create',(req,res)=>mainComponent.create(req,res))
     mainRoutes.post('/store',upload,(req,res)=>mainComponent.store(req,res))
     mainRoutes.get('/:id',(req,res)=>mainComponent.show(req,res))
     mainRoutes.get('/:id/edit',(req,res)=>mainComponent.edit(req,res))
     mainRoutes.put('/:id',upload,(req,res)=>mainComponent.update(req,res))
     mainRoutes.delete('/:id/delete',(req,res)=>mainComponent.del(req,res))

module.exports = mainRoutes