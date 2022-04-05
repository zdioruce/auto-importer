import excuteQuery from '../db'
import { publishToShopify } from '../import'

let running = false

export default async function handler(req, res) {
    const { ids } = req.body

    try {
        if(!running) {
            running = true
            await publishToShopify(ids)
        }

        const drafts = await excuteQuery({
            query: 'SELECT * FROM products WHERE status = 0 ORDER BY id DESC',
            values: [],
        });

        for(const draft of drafts){
            const variants = await excuteQuery({
                query: 'SELECT * FROM variants WHERE variants.product_id = ? ORDER BY id ASC',
                values: [draft.id],
            });
            draft['variants'] = variants
        }

        const draftIds = await excuteQuery({
            query: 'SELECT id FROM products WHERE status = 0',
            values: [],
        });
    
        const productIds = await excuteQuery({
            query: 'SELECT id FROM products WHERE status = 1',
            values: [],
        });

        console.log("import okay")
        running = false
        res.status(200).json({ 
            products: drafts, 
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