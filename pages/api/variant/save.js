import excuteQuery from '../db'
const Shopify = require('shopify-api-node');
const shopify = new Shopify({
    shopName: process.env.SHOP,
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN
});

export default async function handler(req, res) {

    const { data } = req.body

    try {
        await excuteQuery({
            query: "UPDATE variants SET sku=?, barcode=?, quantity=?, height=?, width=?, length=?, weight=?, profit=?, profitAmount=?, fee=?, price=? WHERE id = ?",
            values: [
                data.sku,
                data.barcode,
                data.quantity,
                data.height,
                data.width,
                data.length,
                data.weight,
                data.profit,
                data.profitAmount,
                data.fee,
                data.price,
                data.id
            ],
        });
        
        if(data.shopify_id) {
            console.log('variant id =', data.shopify_id)
            shopify.productVariant.update(
                data.shopify_id,
                {
                    price: data.price.toString(),
                    weight: data.weight,
                    sku: data.sku,
                    barcode: data.barcode
                }
            )    
        }

        res.status(200).json({ status: 1 })
    } catch ( error ) {
        res.status(500).json({ status: 0, error })
    }
}  