import express from 'express'
import products from '../data/products.js'

function getProductsRouter() {
    const router = express.Router()

    router.post('/', async (req, res) => {
    })

    router.put('/:id', async (req, res) => {
    })

    
    router.get('/', async (req, res) => {
        res.json(products)
    })

    router.delete('/:id', async (req, res) => {
    })

    return router
}

export { getProductsRouter }
