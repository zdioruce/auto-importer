import excuteQuery from './db'
import { getMetaFields } from './util';
const Shopify = require('shopify-api-node');
const shopify = new Shopify({
    shopName: process.env.SHOP,
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN
});

export const publishToShopify = async (ids) => {
    const stores = await excuteQuery({
        query: 'SELECT * FROM stores WHERE status = 1',
        values: [],
    });

    const shopify = new Shopify({
        shopName: stores[0].url,
        accessToken: stores[0].token
    });
        
    const history = await excuteQuery({
        query: 'INSERT INTO history (upload_time, action, status) VALUES (?, 1, 0)',
        values: [new Date()]
    });

    const products = await excuteQuery({
        query: 'SELECT * FROM products WHERE id IN (?)',
        values: [ids],
    });

    let history_items = []
    for(const product of products)
        history_items.push(`(${history.insertId},'${product.asin}', 0)`)

    await excuteQuery({
        query: 'INSERT INTO history_items (history_id, asin, status) VALUES ' + history_items.join(),
        values: []
    });

    const settingObj = await excuteQuery({
        query: 'SELECT * FROM settings',
        values: [],
    });

    for(const product of products) {     
        console.log('start id =', product.asin)       
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
        
        if(variant_arr.length > 0) {
            if(settingObj[0].upload_first_image_only != 1){
                const productImages = product.images.split(',')
                for(const productImage of productImages) {
                    images.push({"src":process.env.IMAGE_PATH + productImage})
                }
            }

            for(const item of variant_arr) {
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
                        inventory_quantity: item.quantity
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
                        inventory_quantity: item.quantity
                    })    
                }

                image_indexs.push(images.length)
                images.push({"src":process.env.IMAGE_PATH + item.image})
            }               
        } else {
            const productImages = product.images.split(',')
            for(const productImage of productImages) {
                images.push({"src":process.env.IMAGE_PATH + productImage})
            }
        }

        const shopify_product = await shopify.product.create({
            "title": product.title,
            "body_html": product.description,
            "vendor": product.brand,
            "tags": product.tags.split(),
            "images": images,
            "status": "active",
            "options" : options,
            "variants": variants
        })
        
        console.log(shopify_product)

        if(variant_arr.length > 0) {
            for(let i = 0; i < shopify_product.variants.length; i++) {              
                await shopify.productVariant.update(
                    shopify_product.variants[i].id,
                    {
                        image_id: shopify_product.images[image_indexs[i]].id
                    }
                )    

                await excuteQuery({
                    query: "UPDATE variants SET shopify_id=?, WHERE sku=? AND product_id=?",
                    values: [shopify_product.variants[i].id, shopify_product.variants[i].sku, product.id]
                });
            }
        } else {
            await shopify.productVariant.update(
                shopify_product.variants[0].id,
                {
                    image_id: shopify_product.images[0].id,
                    sku: product.asin,
                    barcode: product.barcode,                    
                    price: product.price.toString(),
                    cost: product.buyBoxPrice.toString(),  
                    // inventory_quantity: product.quantity
                }
            ) 
        }

        console.log("start 3")
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
}