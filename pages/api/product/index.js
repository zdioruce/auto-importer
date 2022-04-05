import excuteQuery from '../db'

export default async function handler(req, res) {

    const { page, show, status } = req.body

    try {
        const stores = await excuteQuery({
            query: 'SELECT * FROM stores WHERE status = 1',
            values: []
        });

        const products = await excuteQuery({
            query: 'SELECT * FROM products WHERE status = ? AND store_id = ? ORDER BY id DESC LIMIT ?, ?',
            values: [status, stores[0].id, page * show, show],
        });

        for(const product of products){
            const variants = await excuteQuery({
                query: 'SELECT * FROM variants WHERE variants.product_id = ? ORDER BY id ASC',
                values: [product.id],
            });
            product['variants'] = variants

            if(status == 1) {
                let prices = []
                for(const variant of variants) {
                    prices.push(variant.price)
                }
    
                var min = Math.min(...prices);
                var max = Math.max(...prices);
    
                product['min'] = min
                product['max'] = max                
            }
        }
        
        const draftIds = await excuteQuery({
            query: 'SELECT id FROM products WHERE status = 0',
            values: [],
        });

        const productIds = await excuteQuery({
            query: 'SELECT id FROM products WHERE status = 1',
            values: [],
        });

        res.status(200).json({
            products, 
            draftIds,
            productIds
        })
    } catch ( error ) {
        res.status(500).json({
            error
        })
    }
}  