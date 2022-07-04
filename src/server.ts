import express from "express";
import basicAuth from "express-basic-auth"
import inboundSMSRouter from "./routes/inboundsms";
import getSMS from "./routes/getsms";
import updateRouter from "./routes/update";
import 'dotenv/config'

const app = express();

if(process.env.AUTH_USERNAME && process.env.AUTH_PASSWORD) {

    const user = process.env.AUTH_USERNAME
    const pass = process.env.AUTH_PASSWORD
    //setup auth
    app.use(basicAuth({ //TODO: env var this
        users: { [user]:pass },
        challenge: true,
        realm: 'printkitty', 
    }))

    //setup routes
    app.use("/handleInboundSMS", inboundSMSRouter);
    app.use("/getSMS", getSMS)
    app.use("/updateSMSStatus", updateRouter);
}
else {
    throw 'AUTH_USERNAME and AUTH_PASSWORD env vars not set'
}
//yeet
export default app;