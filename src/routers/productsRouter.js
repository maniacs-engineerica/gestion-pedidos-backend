import express from 'express'
import products from '../data/products.js'
import purchases from '../data/purchases.js'
import sleep from '../helpers/Sleep.js'

function getProductsRouter() {
    const router = express.Router()

    router.get('/', sleep, async (req, res) => {
        const productsCopy = products.filter(p => !p.deleted)

        const items = purchases.reduce(
            (prev, current) => prev.concat(current.items),
            []
        )

        productsCopy.forEach(product => {
            const productItems = items.filter(i => i.product.id == product.id && i.rating > 0);
            if (productItems.length > 0) {
                product.rating = productItems.reduce((a, b) => a + b.rating, 0) / productItems.length
            }
        })

        res.status(200).json(productsCopy)
    })

    router.get('/:slug', sleep, async (req, res) => {
        const product = products.find(p => p.slug == req.params.slug)
        if (!product) {
            res.status(400).json(new Error("Producto inválido"))
            return
        }

        const items = purchases.reduce(
            (prev, current) => prev.concat(current.items),
            []
        ).filter(i => i.product.id == product.id && i.rating > 0);

        if (items.length > 0) {
            product.rating = items.reduce((a, b) => a + b.rating, 0) / items.length
        }

        res.status(200).json(product)
    })

    router.post('/', sleep, async (req, res) => {
        const product = req.body;
        if (product.id){
            const index = products.findIndex(p => p.id == product.id)
            products.splice(index, 1, product)
        } else {
            product.id = products.length+1
            products.push(product)
        }
        res.status(200).json();
    })

    router.delete('/:id', async (req, res) => {
        const product = products.find(p => p.id == req.params.id)
        if (!product) {
            res.status(400).json(new Error("Producto inválido"))
            return
        }
        product.deleted = true;
        res.status(200).json()
    })

    return router
}

export { getProductsRouter }
