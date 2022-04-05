import excuteQuery from '../db'

export default async function handler(req, res) {

    const { id } = req.body

    try {
        await excuteQuery({
            query: 'UPDATE history SET status = 2 WHERE id = ?',
            values: [id],
        });
        
        await excuteQuery({
            query: 'UPDATE history_items SET status = 2 WHERE status = 0 AND history_id = ?',
            values: [id],
        });
          
        const histories = await excuteQuery({
            query: 'SELECT * FROM history WHERE hide = 0',
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

        res.status(200).json({ 
            histories
        })
    } catch ( error ) {
        res.status(500).json({ 
            error 
        })
    }
}  