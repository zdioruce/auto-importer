import excuteQuery from '../../db'

export default async function handler(req, res) {
    const { id } = req.query
    console.log(id)
    try {
        const result = await excuteQuery({
          query: 'DELETE FROM products WHERE id = ' + id,
          values: [],
        });
        res.status(200).json({ result })
    } catch ( error ) {
        res.status(500).json({ error })
    }
}  