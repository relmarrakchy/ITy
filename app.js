let express = require('express')
let app = express()
let authRoutes = require('./routes/authroute')
let cookieParser = require('cookie-parser')

app.listen(3000)
app.set('view engine', 'ejs') //Mettre en place EJS comme un view engine
app.use(express.static('public')) //Permission de fichier public
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => { res.render("index", {title: "Index"}) })
app.get('/profile', (req, res) => { res.render("profile", {title: "Profile"}) })

app.use(authRoutes)