import express from 'express'
import users from '../data/users.js';

function getUsersRouter() {
    const router = express.Router()

    router.post('/login', async (req, res) => {
        const credentials = req.body
        const user = users.find(u => u.email === credentials.email && u.password === credentials.password);        
        if (!user){
            res.status(403).json(new Error("Usuario o contraseña invalida"))
            return
        }
        res.status(200).json(user)
    })

    // router.put('/:id', async (req, res) => {
    // })

    
    // router.get('/', async (req, res) => {
    //     res.json(products)
    // })

    // router.delete('/:id', async (req, res) => {
    // })

    return router
}

export { getUsersRouter }
