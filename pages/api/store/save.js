import excuteQuery from '../db'

export default async function handler(req, res) {

    const { stores } = req.body

    try {
        for(const store of stores){
            await excuteQuery({
                query: "UPDATE stores SET status=? WHERE id = ?",
                values: [store.status, store.id],
            });    
        }

        res.status(200).json({ status: 1, stores })
    } catch ( error ) {
        res.status(500).json({ status: 0, error })
    }
}  