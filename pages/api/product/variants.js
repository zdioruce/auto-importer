import excuteQuery from '../db'

export default async function handler(req, res) {
    const {id} = JSON.parse(req.body)

    try {
        const result = await excuteQuery({
          query: 'SELECT * FROM variants WHERE product_id = ?',
          values: [id],
        });
        res.status(200).json({ result })
    } catch ( error ) {
        res.status(500).json({ error })
    }
}  