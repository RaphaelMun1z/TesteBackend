const router = require('express').Router()

const Product = require('../models/Product')


// Create - criação de dados
router.post('/', async (req, res) => {

    // req.body
    const {
        title,
        brand,
        amount,
        description,
        assesment,
        sold,
        price,
        active,
        section,
        category,
        createdAt,
    } = req.body

    if (!title) {
        res.status(422).json({ error: 'O título é obrigatório' })
        return
    }

    const product = {
        title,
        brand,
        amount,
        description,
        assesment,
        sold,
        price,
        active,
        section,
        category,
        createdAt,
    }

    // create

    try {
        // criando dados
        await Product.create(product)

        res.status(201).json({ message: 'Produto inserido com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Read - leitura de dados
router.get('/', async (req, res) => {
    try {
        const products = await Product.find()

        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Read - leitura de dado
router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {
        const product = await Product.findOne({ _id: id })

        if (!product) {
            res.status(422).json({ message: 'O produto não foi encontrado!' })
            return
        }

        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Update
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const {
        title,
        brand,
        amount,
        description,
        assesment,
        sold,
        price,
        active,
        section,
        category,
        createdAt,
    } = req.body

    const product = {
        title,
        brand,
        amount,
        description,
        assesment,
        sold,
        price,
        active,
        section,
        category,
        createdAt,
    }

    try {
        const updatedProduct = await Product.updateOne({ _id: id }, product)

        if (updatedProduct.matchedCount === 0) {
            res.status(422).json({ message: 'O produto não foi encontrado!' })
            return
        }

        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// Delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const product = await Product.findOne({ _id: id })

    if (!product) {
        res.status(422).json({ error: 'O produto não foi encontrado!' })
        return
    }

    try {
        await Product.deleteOne({ _id: id })
        res.status(200).json({ message: 'Produto deletado com sucesso!' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router 