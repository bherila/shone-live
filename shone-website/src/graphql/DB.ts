import { Container } from 'typedi'
import { createConnection, getConnectionManager, useContainer } from 'typeorm'
import { Connection } from 'typeorm/connection/Connection'

import { MessageEntity } from './message/message-entity'
import { Show } from './show/show-entity'
import { User } from './user/user-entity'
// this needs to be a singleton because there can only be 1 connection per node process (see: "AlreadyHasActiveConnectionError")
async function db() {
  // register 3rd party IOC container
  useContainer(Container)

  const connectionManager = getConnectionManager()
  let connection: Connection

  // Do we need to reset the connection?
  if (connectionManager.has('default')) {
    connection = connectionManager.get('default')
    await connection.close()
  }

  connection = await createConnection({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    entities: [User, Show, MessageEntity],
    synchronize: true,
    logging: false,
    port: 3306,
  })
  if (!connection) {
    throw new Error('No connection :(')
  }
  return {
    ...connection,
    users: connection.getRepository(User),
    shows: connection.getRepository(Show),
    message: connection.getRepository(MessageEntity),
  }
}

const database = db()
export default database
