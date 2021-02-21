import { createConnection } from 'typeorm'
import User from './entities/User'

// this needs to be a singleton because there can only be 1 connection per node process (see: "AlreadyHasActiveConnectionError")
async function db() {
    const connection = await createConnection({
        type: 'mysql',
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [User],
        synchronize: true,
        logging: false,
        port: 3306,
    })
    if (!connection) {
        throw new Error('No connection :(')
    }
    return {
        ...connection,
        users: connection.getRepository(User)
    }
}

export default db();
