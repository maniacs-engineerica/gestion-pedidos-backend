import express from 'express'
import products from '../data/products.js'
import purchases from '../data/purchases.js'

function getProductsRouter() {
    const router = express.Router()
    
    router.get('/', async (req, res) => {
        res.json(products)
    })

    router.get('/:slug', async (req, res) => {
        const product = products.find(p => p.slug == req.params.slug) 
        if (!product){
            res.status(400).json(new Error("Producto inválido"))
            return
        }

        const items = purchases.reduce(
            (prev, current) => prev.concat(current.items),
            []
        ).filter(i => i.product.id == product.id && i.rating > 0);

        if (items.length > 0){
            product.rating = items.reduce((a, b) => a + b.rating, 0) / items.length
        }

        res.status(200).json(product)
    })

    return router
}

export { getProductsRouter }
