import excuteQuery from '../db'

export default async function handler(req, res) {

    try {
        const stores = await excuteQuery({
          query: 'SELECT * FROM stores',
          values: [],
        });
        console.log(stores)
        res.status(200).json({ status: 1, stores })
    } catch ( error ) {
        res.status(500).json({ status: 0, error })
    }
}  