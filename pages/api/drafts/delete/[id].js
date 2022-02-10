import excuteQuery from '../../db'

export default async function handler(req, res) {
    const { id } = req.query
    try {
        await excuteQuery({
          query: 'DELETE FROM products WHERE id = ?',
          values: [id],
        });
        res.status(200).json({ status: 1 })
    } catch ( error ) {
        res.status(500).json({ error })
    }
}  