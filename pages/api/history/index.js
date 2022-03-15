import excuteQuery from '../db'

export default async function handler(req, res) {
    try {
        const histories = await excuteQuery({
            query: 'SELECT * FROM history WHERE status = 0',
            values: [],
        });
        
        for(const history of histories) {

            const totals = await excuteQuery({
                query: 'SELECT COUNT(id) AS total_count FROM history_items WHERE history_id = ?',
                values: [history.id]
            });

            const completes = await excuteQuery({
                query: 'SELECT COUNT(id) AS complete_count FROM history_items WHERE history_id = ? AND status = 1',
                values: [history.id]
            });

            history.total = totals[0].total_count
            history.complete = completes[0].complete_count
        }

        res.status(200).json({ histories })
    } catch ( error ) {
        res.status(500).json({ error })
    }
}  