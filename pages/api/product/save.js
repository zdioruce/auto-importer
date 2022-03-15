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
            query: "UPDATE products SET title=?, brand=?, collections=?, tags=?, shipping_method=?, country=?, city=? WHERE id = ?",
            values: [
                data.title, 
                data.brand,
                data.collections,
                data.tags, 
                data.shipping_method,
                data.country,
                data.city,
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