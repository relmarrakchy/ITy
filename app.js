let express = require('express')
let app = express()
let authRoutes = require('./routes/authroute')
let indexRoutes = require('./routes/indexRoutes')
let profileRoutes = require('./routes/profileRoutes')
let articleRoutes = require('./routes/articleRoutes')
let {checkUser} = require('./middleware/authMiddleware')
let cookieParser = require('cookie-parser')


app.listen(3000)
app.set('view engine', 'ejs') //Mettre en place EJS comme un view engine
app.use(express.static('public')) //Permission de fichier public
app.use(express.json())
app.use(cookieParser())

app.use("*", checkUser)
app.use(indexRoutes)
app.use(authRoutes)
app.use(profileRoutes)
app.use(articleRoutes)