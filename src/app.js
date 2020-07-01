import express from 'express'
import cors from 'cors'
import { getPurchasesRouter } from './routers/purchasesRouter.js'
import { getProductsRouter } from './routers/productsRouter.js'
import { getUsersRouter } from './routers/usersRouter.js'


class App {
    constructor() {
        const app = express()
        app.use(express.json())
        app.use(cors()); 
        
        app.use('/api/purchases', getPurchasesRouter())
        app.use('/api/products', getProductsRouter())
        app.use('/api/users', getUsersRouter())

        // app.options('*', cors()); 
        // app.use(function (req, res, next) {
        //     res.header("Access-Control-Allow-Origin", "*");
        //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //     next();
        // });
        // app.use(function (req, res, next) {
        //     res.header("Access-Control-Allow-Origin", "http://localhost:8080");
        //     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        //     res.header("Access-Control-Allow-Headers", "X-Requested-With,     Content-Type");
        //     next();
        // });
        
        this.app = app
    }

    start(port) {
        const server = this.app.listen(port, () => {
            console.log(`listening on port ${server.address().port}`)
        })
    }
}

export default App
