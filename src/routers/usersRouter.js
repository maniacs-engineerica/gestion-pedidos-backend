import express from 'express'
import users from '../data/users.js';
import sleep from '../helpers/Sleep.js';

function getUsersRouter() {
    const router = express.Router()

    router.post('/login', sleep, async (req, res) => {
        const credentials = req.body
        const user = users.find(u => u.email === credentials.email && u.password === credentials.password);        
        if (!user){
            res.status(403).json(new Error("Usuario o contraseña invalida"))
            return
        }
        res.status(200).json(user)
    })

    router.get('/clients', sleep, async (req, res) => {
        const clients = users.filter(u => !u.isAdmin)
        res.status(200).json(clients)
    })

    return router
}

export { getUsersRouter }
