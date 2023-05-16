let {PrismaClient} = require('@prisma/client')
let prisma = new PrismaClient()

let index_get = async (req, res) => {
    let categories = ""
    try {
        await prisma.$connect();

        categories = await prisma.categorie.findMany()
    } catch (err) {
        console.log(err)
    } finally {
        await prisma.$disconnect();
    }
    res.render("index", {title: "Index", active: "index", categories: categories})
}

module.exports = {index_get}