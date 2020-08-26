const    
    express         = require('express'),
    mainRoutes          = express.Router(),
    mainComponent = require('../components/mainComponent.js'),
    multer = require('multer'),
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'public/images/')
        },
        filename: function (req, file, cb) {
          cb(null,Date.now() + '-' + file.originalname) //Appending extension
        }
      }),
    upload = require('multer')({ 
      limits:{
        fileSize: 3000000
      },
      storage: storage,
      fileFilter: (req, file, cb) =>{
        regex = RegExp('image/*')
        if(regex.test(file.mimetype)){
          cb(null,true)
        }else{
          cb(null,false)
          cb(new Error('Wrong file type!'))
        }
      }
     })

     mainRoutes.get('/',(req,res)=>mainComponent.index(req,res))
     mainRoutes.get('/create',(req,res)=>mainComponent.create(req,res))
     mainRoutes.post('/store',upload.single('image'),(req,res)=>mainComponent.store(req,res))
     mainRoutes.get('/:id',(req,res)=>mainComponent.show(req,res))
     mainRoutes.get('/:id/edit',(req,res)=>mainComponent.edit(req,res))
     mainRoutes.put('/:id',upload.single('image'),(req,res)=>mainComponent.update(req,res))
     mainRoutes.delete('/:id/delete',(req,res)=>mainComponent.del(req,res))

module.exports = mainRoutes