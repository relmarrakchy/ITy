let {PrismaClient} = require('@prisma/client')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let prisma = new PrismaClient()

let admin_get = async (req, res) => {
    try {
        await prisma.$connect()

        let categories = await prisma.categorie.findMany({
            include: {
                articles: true
            }
        })

        let users = await prisma.user.findMany({
            include: {
                articles: true
            }
        })

        users.forEach(user => {
            delete user.password
        })
        res.render("admin", {categories: categories, users: users})
    } catch(err) {
        console.log(err)
    } finally {
        await prisma.$disconnect()
    }
}

let addAdmin = async (req, res) => {
    let {nom, email, password} = req.body

    try {
        await prisma.$connect()

        let verifyEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!verifyEmail) {
            let salt = await bcrypt.genSalt()
            let hashedPassword = await bcrypt.hashSync(password, salt)

            if (hashedPassword) {
                let newAdmin = await prisma.user.create({
                    data: {
                        nom: nom,
                        email: email,
                        password: hashedPassword,
                        role: "ADMIN"
                    }
                })

                if (newAdmin) {
                    res.json({success: 1})
                }
            }
        } else {
            res.json({errEmail: "This email is already used !"})
        }
    } catch(err) {
        console.log(err)
    } finally {
        await prisma.$disconnect()
    }
}

let modifyAdmin = async (req, res) => {
    let {id} = req.params
    let {name, email, password} = req.body

    try {
        let salt = await bcrypt.genSalt()
        let hashedPassword = await bcrypt.hashSync(password, salt)

        await prisma.$connect()

        if (hashedPassword) {
            let updatedRecord = await prisma.user.update({
                where: {
                    id: Number(id)
                },
                data: {
                    nom: name,
                    email: email,
                    password: hashedPassword,
                    role: "ADMIN"
                }
            })

            if (updatedRecord) {
                res.json({success: 1})
            }
        }
    } catch (err) {
        console.log(err)
    } finally {
        await prisma.$disconnect()
    }
}

let get_data = async (req, res) => {
    try {
        await prisma.$connect()

        let categories = await prisma.categorie.findMany({
            include: {
                articles: true
            }
        })
        
        if (categories) {
            res.json({categories: categories})
        }
    } catch (err) {
        console.log(err)
    } finally {
        await prisma.$disconnect()
    }
}

module.exports = { admin_get, addAdmin, modifyAdmin, get_data }