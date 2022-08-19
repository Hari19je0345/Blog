const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

const port = process.env.PORT || 5000

mongoose.connect('mongodb://127.0.0.1:27017/blog')
const db = mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.log('Connected to Database'))

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(port)