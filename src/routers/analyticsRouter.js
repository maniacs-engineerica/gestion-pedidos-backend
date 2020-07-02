import express from 'express'
import purchases from '../data/purchases.js';


function getAnalyticsRouter() {
    const router = express.Router()

    router.get('/productsales', async (req, res) => {
        let limit = 5;
        const queryParams = new Map(Object.entries(req.query))
        if (queryParams.has("limit")) {
            limit = queryParams.get("limit");
        }
        const items = purchases.reduce(
            (prev, current) => prev.concat(current.items),
            []
        );
        const productsCount = items
            .map(p => p.product)
            .reduce((prev, current) => {
                let product = prev.find(p => p.id == current.id);
                if (!product) {
                    product = Object.assign({ count: 0 }, current);
                    prev.push(product);
                }
                product.count++;
                return prev;
            }, []);
        const response = productsCount
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);
        res.status(200).json(response)
    })

    router.get('/frequentclients', async (req, res) => {
        let limit = 5;
        const queryParams = new Map(Object.entries(req.query))
        if (queryParams.has("limit")) {
            limit = queryParams.get("limit");
        }
        const clients = purchases
            .map(p => p.client)
            .reduce((prev, current) => {
                let client = prev.find(c => c.id == current.id);
                if (!client) {
                    client = Object.assign({ count: 0 }, current);
                    prev.push(client);
                }
                client.count++;
                return prev;
            }, []);

        const response = clients
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);
        res.status(200).json(response)
    })

    router.get('/profitableclients', async (req, res) => {
        let limit = 5;
        const queryParams = new Map(Object.entries(req.query))
        if (queryParams.has("limit")) {
            limit = queryParams.get("limit");
        }
        const clients = purchases.reduce((prev, current) => {
            let client = prev.find(c => c.id == current.client.id);
            if (!client) {
              client = Object.assign({ amount: 0 }, current.client);
              prev.push(client);
            }
    
            const purchaseAmount = current.items.reduce(
              (prev, current) => prev + current.quantity * current.product.price,
              0
            );
    
            client.amount += purchaseAmount;
    
            return prev;
          }, []);
    
          const response = clients
            .sort((a, b) => b.amount - a.amount)
            .slice(0, limit);
        res.status(200).json(response)
    })

    return router
}

export { getAnalyticsRouter }
