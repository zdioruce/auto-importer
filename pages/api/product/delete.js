import excuteQuery from '../db'
const Shopify = require('shopify-api-node');
const shopify = new Shopify({
    shopName: process.env.SHOP,
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN
});

export default async function handler(req, res) {
    const { ids, option, status } = req.body
    
    try {
        if(option == 1){
            const result = await excuteQuery({
                query: 'SELECT * FROM products WHERE id IN (?)',
                values: [ids],
            });
    
            result.forEach(item => {
                shopify.product.delete(item.shopify_product_id)
            })
        }  

        await excuteQuery({
            query: "DELETE FROM products WHERE id IN (?)",
            values: [ids],
        })
        
        await excuteQuery({
            query: "DELETE FROM options WHERE product_id IN (?)",
            values: [ids],
        })  

        await excuteQuery({
            query: "DELETE FROM variants WHERE product_id IN (?)",
            values: [ids],
        }) 

        const products = await excuteQuery({
            query: 'SELECT * FROM products WHERE status = ?',
            values: [status],
        })

        for(const product of products){
            const variants = await excuteQuery({
                query: 'SELECT * FROM variants WHERE variants.product_id = ?',
                values: [product.id],
            });

            let prices = []
            for(const variant of variants) {
                prices.push(variant.price)
            }

            var min = Math.min(...prices);
            var max = Math.max(...prices);

            product['min'] = min
            product['max'] = max            
            product['variants'] = variants
        }

        const draftCount = await excuteQuery({
            query: 'SELECT COUNT(id) AS numberOfProducts FROM products WHERE status = 0',
            values: [],
        });
        
        const productCount = await excuteQuery({
            query: 'SELECT COUNT(id) AS numberOfProducts FROM products WHERE status = 1',
            values: [],
        });

        res.status(200).json({ 
            products, 
            draftCount: draftCount[0].numberOfProducts,
            productCount: productCount[0].numberOfProducts,
        })
    } catch ( error ) {
        res.status(500).json({ 
            error 
        })
    }
}  