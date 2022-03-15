import excuteQuery from '../db'

const Shopify = require('shopify-api-node');
const shopify = new Shopify({
    shopName: process.env.SHOP,
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN
});

export default async function handler(req, res) {
    const { ids } = req.body

    try {
        const history = await excuteQuery({
            query: 'INSERT INTO history (upload_time, action, status) VALUES (?, 1, 0)',
            values: [
                new Date()  
            ]
        });
        
        const products = await excuteQuery({
            query: 'SELECT * FROM products WHERE id IN (?)',
            values: [ids],
        });

        let history_items = []
        for(const product of products) {
            history_items.push(`(${history.insertId},'${product.asin}', 0)`)
        }

        await excuteQuery({
            query: 'INSERT INTO history_items (history_id, asin, status) VALUES ' + history_items.join(),
            values: []
        });

        for(const product of products) {     
            console.log('start')       
            const option_arr = await excuteQuery({
                query: 'SELECT name, value FROM options WHERE product_id = ?',
                values: [product.id],
            });
    
            let options = []
            option_arr.forEach(item => {
                options.push({
                    name: item.name,
                    values: item.value
                })
            })
    
            console.log('start 1')      

            const variant_arr = await excuteQuery({
                query: 'SELECT * FROM variants WHERE product_id = ?',
                values: [product.id],
            });
    
            let images = []
            let variants = []
            let image_indexs = []
    
            console.log('start 2')

            variant_arr.forEach(item => {
                if(item.option2_value && item.option2_value.length > 0){
                    variants.push({
                        sku: item.sku,
                        option1: item.option1_value,
                        option2: item.option2_value,
                        barcode: item.barcode,
                        price: item.price.toString(),
                        cost: item.buyBoxPrice.toString(),   
                        weight: item.weight,
                        weight_unit: "lb",
                    })    
                }else{
                    variants.push({
                        sku: item.sku,
                        option1: item.option1_value,
                        barcode: item.barcode,                    
                        price: item.price.toString(),
                        cost: item.buyBoxPrice.toString(),  
                        weight: item.weight,
                        weight_unit: "lb",
                    })    
                }
    
                image_indexs.push(images.length)
                images.push({"src":process.env.IMAGE_PATH + item.image})
            })        
    
            console.log('start 3')
            console.log('images =', images)
            console.log('variants =', variants)
            console.log('options =', options)
            const shopify_product = await shopify.product.create({
                "title": product.title,
                "body_html": product.description,
                "vendor": product.brand,
                "tags": product.tags.split(),
                "images": images,
                "status": "draft",
                "options" : options,
                "variants": variants
            })
            console.log('start 4 =', shopify_product)
    
            for(let i = 0; i < shopify_product.variants.length; i++) {              
                await shopify.productVariant.update(
                    shopify_product.variants[i].id,
                    {
                        image_id: shopify_product.images[image_indexs[i]].id
                    }
                )    

                await excuteQuery({
                    query: "UPDATE variants SET shopify_id=? WHERE sku=? AND product_id=?",
                    values: [shopify_product.variants[i].id, shopify_product.variants[i].sku, product.id]
                });
            }

            console.log("product import end")
    
            await excuteQuery({
                query: "UPDATE products SET shopify_product_id=?, handle=?, status=1 WHERE id = ?",
                values: [shopify_product.id, shopify_product.handle, product.id],
            });

            await excuteQuery({
                query: "UPDATE history_items SET status = 1, shopify_id=?, handle=?, title=?, image=? WHERE history_id=? AND asin = '" + product.asin + "'",
                values: [shopify_product.id, shopify_product.handle, product.title, product.images[0], history.insertId]
            });

            console.log('end')
        }

        await excuteQuery({
            query: "UPDATE history SET status = 1 WHERE id = ?",
            values: [history.insertId]
        });
        
        const drafts = await excuteQuery({
            query: 'SELECT * FROM products WHERE status = 0',
            values: [],
        });

        for(const draft of drafts){
            const variants = await excuteQuery({
                query: 'SELECT * FROM variants WHERE variants.product_id = ?',
                values: [draft.id],
            });

            let prices = []
            for(const variant of variants) {
                prices.push(variant.price)
            }

            var min = Math.min(...prices);
            var max = Math.max(...prices);

            draft['min'] = min
            draft['max'] = max            
            draft['variants'] = variants
        }

        const draftCount = await excuteQuery({
            query: 'SELECT COUNT(id) AS numberOfProducts FROM products WHERE status = 0',
            values: [],
        });
        
        const productCount = await excuteQuery({
            query: 'SELECT COUNT(id) AS numberOfProducts FROM products WHERE status = 1',
            values: [],
        });

        console.log("import okay")
        res.status(200).json({ 
            products: drafts, 
            draftCount: draftCount[0].numberOfProducts,
            productCount: productCount[0].numberOfProducts,
        })
    } catch ( error ) {
        console.log(error.message)
        res.status(500).json({ 
            error 
        })
    }
}  