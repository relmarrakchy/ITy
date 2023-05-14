let {PrismaClient} = require('@prisma/client')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let prisma = new PrismaClient()

let login_get = (req, res) => { res.render("login", {title: "Login"}) }

let login_post = async (req, res) => {
    let {email, password} = req.body

    try {
        let logUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (logUser) {
            let auth = await bcrypt.compare(password, logUser.password)

            if (auth) {
                res.json(logUser)
            } else {
                res.json({code: "222"})
            }
        } else {
            res.json({code: "000"})
        }
    } catch (err) {
        res.json(err)
    }
}

let signup_get = (req, res) => { res.render("signup", {title: "Sign up"}) }

let maxAge = 24 * 60 * 60
let createToken = (id) => {
    return jwt.sign({id}, "ity2023", {
        expiresIn: maxAge
    })
}

let signup_post = async (req, res) => {
    let {name, email, password} = req.body

    let salt = await bcrypt.genSalt()
    let hachedPassword = await bcrypt.hashSync(password, salt)

    try {
        let newUser = await prisma.user.create({
            data: {
                nom: name,
                email: email,
                password: hachedPassword,
                role: "AUTHOR"
            }
        })

        let token = createToken(newUser.id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user: newUser.id})
    } catch (err) {
        res.json(err)
    }
}

module.exports = {
    login_get, signup_get, signup_post, login_post
}