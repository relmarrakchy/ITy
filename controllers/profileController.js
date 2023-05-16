let {PrismaClient} = require('@prisma/client')
let jwt = require('jsonwebtoken')
let prisma = new PrismaClient()

let profile_get = async (req, res) => {
    let categories = ""
    try {
        await prisma.$connect();

        categories = await prisma.categorie.findMany()
    } catch (err) {
        console.log(err)
    } finally {
        await prisma.$disconnect();
    }
    res.render("profile", {active: "profile", categories: categories})
}

module.exports = {profile_get}