// Config Init
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

// Forma de ler JSON / Middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

// Rotas da API
const personRoutes = require('./routes/personRoutes')
const productRoutes = require('./routes/productRoutes')

app.use('/person', personRoutes)
app.use('/product', productRoutes)

// Rota Inicial / Endpoint
app.get('/', (req, res) => {
    // Mostrar Req
    res.json({ message: 'Oi Express!' })
})

// Entregar uma porta 
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluste.picnhna.mongodb.net/?retryWrites=true&w=majority`,
)
    .then(() => {
        console.log('Conectamos ao MongoDB')
        app.listen(3000)
    })
    .catch((err) => {
        console.log(err)
    }) 
