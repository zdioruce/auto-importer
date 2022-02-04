import excuteQuery from '../db'

export default async function handler(req, res) {

    try {
        const result = await excuteQuery({
          query: 'SELECT * FROM products WHERE status = 1',
          values: [],
        });
        res.status(200).json({ result })
    } catch ( error ) {
        res.status(500).json({ error })
    }
}  