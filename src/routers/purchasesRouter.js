import express from 'express'
import users from '../data/users.js'
import purchases from '../data/purchases.js'
import PurchaseHelper from '../helpers/PurchaseHelper.js'

function getPurchasesRouter() {
    const router = express.Router()

    router.get('/', async (req, res) => {
        const queryParams = new Map(Object.entries(req.query))
        if (!queryParams.has("user")) {
            res.status(400).json(new Error("Falta parametro user"))
            return
        }
        const user = users.find(u => u.id == queryParams.get("user"));
        if (!user) {
            res.status(400).json(new Error("Usuario invalido"))
            return
        }
        const response = user.isAdmin
            ? purchases.filter(p => p.status != 3)
            : purchases.filter(p => p.client.id == user.id);
        res.status(200).json(response)
    })

    router.post('/', async (req, res) => {
        res.json()
    })

    router.put('/:id', async (req, res) => {
        const purchase = req.body
        const index = purchases.findIndex(p => p.id == purchase.id)
        if (index < 0){
            res.status(400).json(new Error("Pedido invalido"))
            return
        }
        purchases.splice(index, 1, purchase)
    })

    router.get('/current', async (req, res) => {
        const queryParams = new Map(Object.entries(req.query))
        let user = null
        if (queryParams.has("user")) {
            user = users.find(u => u.id == queryParams.get("user"));
        }
        const purchase = PurchaseHelper.getCurrent(user)
        res.status(200).json(purchase)
    })

    router.get('/:id', async (req, res) => {
        const queryParams = new Map(Object.entries(req.query))
        if (!queryParams.has("user")) {
            res.status(400).json(new Error("Falta parametro user"))
            return
        }
        const user = users.find(u => u.id == queryParams.get("user"));
        if (!user) {
            res.status(400).json(new Error("Usuario invalido"))
            return
        }
        const purchase = PurchaseHelper.getOrCreate(user, req.params.id)
        res.status(200).json(purchase)
    })

    router.delete('/:id', async (req, res) => {
    })

    return router
}

export { getPurchasesRouter }