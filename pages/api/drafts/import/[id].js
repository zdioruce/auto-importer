import excuteQuery from '../../db'
// import '../shopify'
const Shopify = require('shopify-api-node');
const shopify = new Shopify({
    shopName: process.env.SHOP,
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN
});

export default async function handler(req, res) {
    const { id } = req.query

    try {
        const product = await excuteQuery({
          query: 'SELECT * FROM products WHERE id = ' + id,
          values: [],
        });
          
        const result2 = await excuteQuery({
            query: 'SELECT name, value FROM options WHERE product_id = ' + id,
            values: [],
        });

        let options = []
        result2.forEach(item => {
            options.push({
                name: item.name,
                values: item.value
            })
        })

        const result3 = await excuteQuery({
            query: 'SELECT sku, option1, option2, barcode FROM variants WHERE product_id = ' + id,
            values: [],
        });

        let variants = []
        result3.forEach(item => {
            if(item.option2.length > 0){
                variants.push({
                    sku: item.sku,
                    option1: item.option1,
                    option2: item.option2,
                    barcode: item.barcode,
                    compare_at_price: item.price
                })    
            }else{
                variants.push({
                    sku: item.sku,
                    option1: item.option1,
                    barcode: item.barcode,
                    compare_at_price: item.price
                })    
            }
        })

        let images = []
        product[0].images.split(',').forEach(item => {
            images.push({"src":process.env.IMAGE_PATH + item})
        })

        shopify.product
        .create({
            "title": product[0].title,
            "body_html": product[0].description,
            "vendor": product[0].brand,
            // "product_type": productData.type,
            "tags": product[0].tags.split(),
            "images": images,
            "status": "draft",
            "options" : options,
            "variants": variants
        })
        .then(async (product) => {
            await excuteQuery({
                query: "UPDATE products SET shopify_product_id=?, handle=?, status=1 WHERE id = ?",
                values: [product.id, product.handle, id],
            });

            res.status(200).json({ status: 1 })
        })
        .catch((err) => {
            console.error(err)

            res.status(200).json({ status: 0 })
        });
    } catch ( error ) {
        res.status(500).json({ error })
    }
}  