let express = require('express')
let app = express()
let authRoutes = require('./routes/authroute')

app.listen(3000)
app.set('view engine', 'ejs') //Mettre en place EJS comme un view engine
app.use(express.static('public')) //Permission de fichier public
app.use(express.json()) //Transmettre les données au format JSON

app.get('/', (req, res) => { res.render("index", {title: "Index"}) })
app.use(authRoutes)