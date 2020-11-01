const express = require('express')
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose')
const app = express()
const port = 5000
const methodOverride = require('method-override')

const Article = require('./models/article')


mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({
    extended: false
}))
// untuk method delete
app.use(methodOverride('_method'))
// End
app.use('/articles', articleRouter)
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        creatdAt: 'desc'
    })
    res.render('articles/index', {
        articles: articles
    })
})

app.listen(port, () => console.log(`Example app listening on port port!`))