import excuteQuery from '../db'
const Shopify = require('shopify-api-node');
const shopify = new Shopify({
    shopName: process.env.SHOP,
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN
});

export default async function handler(req, res) {

    const {productIDs, option} = JSON.parse(req.body)

    try {
        if(option == 1){
            const result = await excuteQuery({
                query: 'SELECT * FROM products WHERE id IN (?)',
                values: [productIDs],
            });
    
            result.forEach(item => {
                shopify.product.delete(item.shopify_product_id)
            })
        }        

        await excuteQuery({
            query: 'DELETE FROM products WHERE id IN (?)',
            values: [productIDs],
        });      

        res.status(200).json({ status: 1 })
    } catch ( error ) {
        res.status(500).json({ status: 0, error })
    }
}  