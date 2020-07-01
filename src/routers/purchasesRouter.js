import express from 'express'
import purchases from '../data/purchases.js'

function getPurchasesRouter(){
    const router = express.Router()

    router.get('/', async (req, res) => {
        res.json(purchases)
    })

    router.post('/', async (req, res) => {
        res.json()
    })

    router.put('/:id', async (req, res) => {
    })

    router.delete('/:id', async (req, res) => {
    })

    return router
}

export { getPurchasesRouter }