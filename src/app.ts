import 'dotenv/config'
import app from "./server";
import { connectToDB } from "./db"
import { logger } from './logger';

const port = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000

try {
    connectToDB()

    app.listen(port, () => {
        logger.info(`printkitty-sms listening on port ${port}`)
    })
}
catch(e) {
    logger.error(e)
}
