import { NextApiRequest, NextApiResponse } from 'next'

import 'reflect-metadata'
import Connection from '../../lib/connection';

async function handler(req: NextApiRequest, res: NextApiResponse):Promise<void> {
    try {
        if (await Connection) {
            console.info('CONNECTEDDDDDDDDDDDDDDDD!!')
            res.status(200).json(req.body)
        }
        else {
            throw new Error("No connection :(")
        }
    }
    catch (err) {
        res.status(500).json({error: err});
    }
}

export default handler
