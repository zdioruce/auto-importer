import excuteQuery from '../db'

export default async function handler(req, res) {

    const { setting } = req.body
    
    try {
        await excuteQuery({
            query: "UPDATE settings SET upload_first_image_only=?, fee=?, profit=?, profitAmount=?, minProfitAmount=? WHERE id = 1",
            values: [
                setting.upload_first_image_only,
                setting.fee,
                setting.profit,
                setting.profitAmount,
                setting.minProfitAmount
            ],
        });

        const settings = await excuteQuery({
            query: 'SELECT * FROM settings',
            values: [],
        });        
          
        res.status(200).json({ 
            setting: settings[0] 
        })
    } catch ( error ) {
        res.status(500).json({ 
            error 
        })
    }
}  