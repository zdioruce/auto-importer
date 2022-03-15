import excuteQuery from '../db'

export default async function handler(req, res) {

    const { id } = req.query

    try {
        const products = await excuteQuery({
          query: 'SELECT * FROM products WHERE id = ?',
          values: [id],
        });

        for(const product of products){
            const variants = await excuteQuery({
                query: 'SELECT * FROM variants WHERE variants.product_id = ?',
                values: [product.id],
            });

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
            productCount: productCount[0].numberOfProducts
        })
    } catch ( error ) {
        res.status(500).json({ 
            error 
        })
    }
}  