// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import excuteQuery from '../db'

export default async function handler(req, res) {

    const { name, url, token } = req.body

    await excuteQuery({
        query: 'INSERT INTO stores (name, url, token, status) VALUES (?, ?, ?, 0)',
        values: [name, url, token]
    });

    res.status(200).json({ status: 1 })
}