import excuteQuery from '../db'
const Shopify = require('shopify-api-node');
const shopify = new Shopify({
    shopName: process.env.SHOP,
    accessToken: process.env.SHOPIFY_ACCESS_TOKEN
});
let running = false
export default async function handler(req, res) {
    const { ids, option, status } = req.body
    
    try {
        if(!running) {
            running = true
        }

        const historyObj = await excuteQuery({
            query: 'INSERT INTO history (upload_time, action) VALUES (?, ?)',
            values: [new Date(), 2]
        });
        

        let historyItemArr = []
        for(const id of ids) {
            const product = await excuteQuery({
                query: 'SELECT * FROM products WHERE id = ?',
                values: [id],
            });
            
            const image = product[0].images.split(',')[0]

            historyItemArr.push(`(${historyObj.insertId}, '${product[0].asin}', '${product[0].shopify_product_id}', '${product[0].title}', '${image}', 0)`)     
        }
    
        await excuteQuery({
            query: 'INSERT INTO history_items (history_id, asin, shopify_id, title, image, status) VALUES ' + historyItemArr.join(),
            values: []
        });  

        for(const id of ids) {
            const product = await excuteQuery({
                query: 'SELECT * FROM products WHERE id = ?',
                values: [id],
            });

            if(option == 1){    
                console.log(product[0].shopify_product_id)                    
                shopify.product.delete(product[0].shopify_product_id)
            }  
    
            await excuteQuery({
                query: "DELETE FROM products WHERE id = ?",
                values: [id],
            })
            
            await excuteQuery({
                query: "DELETE FROM options WHERE product_id = ?",
                values: [id],
            })  
    
            await excuteQuery({
                query: "DELETE FROM variants WHERE product_id = ?",
                values: [id],
            })
            await excuteQuery({
                query: 'UPDATE history_items SET status=1 WHERE history_id = ? AND asin=?',
                values: [historyObj.insertId, product[0].asin]
            });  
        }

        await excuteQuery({
            query: 'UPDATE history SET status=1 WHERE id=?',
            values: [historyObj.insertId]
        });
        

        // if(option == 1){
        //     const result = await excuteQuery({
        //         query: 'SELECT * FROM products WHERE id IN (?)',
        //         values: [ids],
        //     });
    
        //     result.forEach(item => {
        //         shopify.product.delete(item.shopify_product_id)
        //     })
        // }  

        // await excuteQuery({
        //     query: "DELETE FROM products WHERE id IN (?)",
        //     values: [ids],
        // })
        
        // await excuteQuery({
        //     query: "DELETE FROM options WHERE product_id IN (?)",
        //     values: [ids],
        // })  

        // await excuteQuery({
        //     query: "DELETE FROM variants WHERE product_id IN (?)",
        //     values: [ids],
        // }) 

        const products = await excuteQuery({
            query: 'SELECT * FROM products WHERE status = ? ORDER BY id DESC',
            values: [status],
        })

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

        running = false
        res.status(200).json({ 
            products, 
            draftIds,
            productIds
        })
    } catch ( error ) {
        console.log(error.message)
        res.status(500).json({ 
            error 
        })
    }
}  