import {createConnection} from "typeorm";
import User from "../entities/User";

// this needs to be a singleton because there can only be 1 connection per node process (see: "AlreadyHasActiveConnectionError")
export default new Promise((resolve => {
    resolve(createConnection({
        type: 'mysql',
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [User],
        synchronize: true,
        logging: false,
        port: 3306,
    }));
}))
