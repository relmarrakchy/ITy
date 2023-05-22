let {PrismaClient} = require('@prisma/client')
let jwt = require('jsonwebtoken')
let prisma = new PrismaClient()

let addCategory = async (req, res) => {
    let {category} = req.body

    try {
        await prisma.$connect()

        let record = await prisma.categorie.create({
            data: {
                nom: category
            }
        })

        if (record) {
            res.json({success: 1})
        }
    } catch(err) {
        console.log(err)
    } finally {
        await prisma.$disconnect()
    }
}

let modifyCategory = async (req, res) => {
    let {newValue} = req.body
    let {id} = req.params

    try {
        await prisma.$connect()

        let modRecord = await prisma.categorie.update({
            where: {
                id: Number(id)
            },
            data: {
                nom: newValue
            }
        })

        if (modRecord) {
            res.json({success: 1})
        }
    } catch (err) {
        console.log(err)
    } finally {
        await prisma.$disconnect()
    }
}

let deleteCategory = async (req, res) => {
    let {id} = req.params

    try {
        await prisma.$connect()

        await prisma.categorieArticle.deleteMany({
            where: {
                categorieID: Number(id)
            }
        })

        await prisma.categorie.delete({
            where: {
                id: Number(id)
            }
        })

        res.json({success: 1})

    } catch (err) {
        console.log(err)
    } finally {
        await prisma.$disconnect()
    }
}

module.exports = {addCategory, modifyCategory, deleteCategory}