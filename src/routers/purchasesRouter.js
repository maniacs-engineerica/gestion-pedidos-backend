import express from 'express'
import users from '../data/users.js'
import purchases from '../data/purchases.js'
import PurchaseHelper from '../helpers/PurchaseHelper.js'
import sleep from '../helpers/Sleep.js'

function getPurchasesRouter() {
    const router = express.Router()

    router.get('/', sleep, async (req, res) => {
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
        let response = [...purchases]
        const status = queryParams.get("status")
        if (status && status >= 0){
            response = response.filter(p => p.status == status)
        }

        let client = queryParams.get("client")
        if (client && client.trim().length > 0){
            client = client.trim().toLowerCase()
            response = response.filter(p => p.client.name.toLowerCase().includes(client))
        }

        response = user.isAdmin
            ? response.filter(p => p.status != 3)
            : response.filter(p => p.client.id == user.id && p.status != 3);

        response = response.sort((a, b) => new Date(b.date) - new Date(a.date))

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

    router.get('/current', sleep, async (req, res) => {
        const queryParams = new Map(Object.entries(req.query))
        let user = null
        if (queryParams.has("user")) {
            user = users.find(u => u.id == queryParams.get("user"));
        }
        const purchase = PurchaseHelper.getCurrent(user)
        res.status(200).json(purchase)
    })

    router.get('/:id', sleep, async (req, res) => {
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
        if (!purchase) {
            res.status(400).json(new Error("No existe el pedido"))
            return
        }
        res.status(200).json(purchase)
    })

    return router
}

export { getPurchasesRouter }