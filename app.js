const 
    
    express      = require('express'),
    app          = express(),
    mainRoutes = require('./routes/mainRoutes.js'),
    commentRoutes = require('./routes/commentRoutes.js'),
    mongoose = require('mongoose')

require('dotenv').config()

const dbURI = `mongodb+srv://user1:${process.env.DBPASS}@cluster0.6t0xf.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.listen(3000)
app.use('/notes',mainRoutes)
app.use(commentRoutes)
app.use(function (err, req, res, next) {
    res.status(500)
    res.render('error',{err})
  })
app.get('/',(req,res)=>res.redirect('/notes'))
