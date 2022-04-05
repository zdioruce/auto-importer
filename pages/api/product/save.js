import excuteQuery from '../db'
import { getMetaFields } from '../util';
const Shopify = require('shopify-api-node');
// const shopify = new Shopify({
//     shopName: process.env.SHOP,
//     accessToken: process.env.SHOPIFY_ACCESS_TOKEN
// });

export default async function handler(req, res) {

    const { data } = req.body

    const stores = await excuteQuery({
        query: 'SELECT * FROM stores WHERE status = 1',
        values: [],
    });

    const shopify = new Shopify({
        shopName: stores[0].url,
        accessToken: stores[0].token
    });

    try {
        await excuteQuery({
            query: "UPDATE products SET title=?,brand=?,collections=?,tags=?,shipping_method=?,country=?,city=?,buyBoxPrice=?,unitCost=?,fee=?,netProfitPerUnit=?,netProfitPerUnitPercent=?,netProceeds=?,dealProfit=?,quantity=?,minOrder=? WHERE id = ?",
            values: [
                data.title, 
                data.brand,
                data.collections,
                data.tags, 
                data.shipping_method,
                data.country,
                data.city,                
                data.buyBoxPrice,
                data.unitCost,
                data.fee,
                data.netProfitPerUnit,
                data.netProfitPerUnitPercent,
                data.netProceeds,
                data.dealProfit,
                data.quantity,
                data.minOrder,
                data.id
            ],
        });
        
        if(data.status == 1) {            
            shopify.product.update(
                data.shopify_product_id,
                {
                    "title": data.title,
                    "body_html": data.description,
                    "vendor": data.brand,
                    "tags": data.tags.split(),
                }
            )    

            console.log("product import end")
            await shopify.metafield.update(
                data.metafield_id,
                {
                    value: JSON.stringify(getMetaFields(data))
                }
            )

            // const collections = data.collections.split(',')
            // console.log('collections =', collections)
            // for(const collection of collections) {
            //     if(collection.length > 0){
            //         const list = await shopify.customCollection.list({'title': collection})
            //         const collect = await shopify.collect.get(list[0].id)

            //         if(list && !collect)
            //             await shopify.collect.create({"product_id":data.shopify_product_id,"collection_id":list[0].id})   
            //     }
            // }            
        }

        res.status(200).json({ status: 1 })
    } catch ( error ) {
        res.status(500).json({ status: 0, error })
    }
}  