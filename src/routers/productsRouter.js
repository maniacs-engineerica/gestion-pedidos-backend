import express from 'express'
import products from '../data/products.js'

function getProductsRouter() {
    const router = express.Router()
    
    router.get('/', async (req, res) => {
        res.json(products)
    })

    return router
}

export { getProductsRouter }
