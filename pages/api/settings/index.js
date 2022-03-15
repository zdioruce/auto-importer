import excuteQuery from '../db'

export default async function handler(req, res) {

    try {
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