import express from 'express'
import cors from 'cors'
import { getPurchasesRouter } from './routers/purchasesRouter.js'
import { getProductsRouter } from './routers/productsRouter.js'
import { getUsersRouter } from './routers/usersRouter.js'
import { getAnalyticsRouter } from './routers/analyticsRouter.js'


function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }   

class App {
    constructor() {
        const app = express()
        app.use(express.json())
        app.use(cors()); 

        app.use(async (req, res, next) => {
            const delay = Math.floor((Math.random() * 1000))
            await sleep(delay)
            next()
        });
        
        app.use('/api/purchases', getPurchasesRouter())
        app.use('/api/products', getProductsRouter())
        app.use('/api/users', getUsersRouter())
        app.use('/api/analytics', getAnalyticsRouter())

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
