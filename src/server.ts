import express from "express"
import basicAuth from "express-basic-auth"
import expressPinoLogger from "express-pino-logger";
import 'dotenv/config'
import inboundSMSRouter from "./routes/inboundsms"
import getSMS from "./routes/getsms"
import updateRouter from "./routes/update"
import health from "./routes/health"
import { logger } from './logger';

const app = express();
app.use(expressPinoLogger({ logger: logger, useLevel: 'debug' }));

if(process.env.AUTH_USERNAME && process.env.AUTH_PASSWORD) {
    const user = process.env.AUTH_USERNAME
    const pass = process.env.AUTH_PASSWORD

    //setup auth
    app.use(basicAuth({
        users: { [user]:pass },
        challenge: true,
        realm: 'printkitty', 
    }))

    //setup routes
    app.use("/handleInboundSMS", inboundSMSRouter);
    app.use("/getSMS", getSMS)
    app.use("/updateSMSStatus", updateRouter);
    app.use("/health", health);

    //TODO: add delete route
}
else {
    throw 'AUTH_USERNAME and AUTH_PASSWORD env vars not set'
}
//yeet
export default app;
