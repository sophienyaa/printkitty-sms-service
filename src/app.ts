import app from "./server";
import { connectToDB } from "./db"
import 'dotenv/config'
const port = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3000

connectToDB()

app.listen(port, () => {
    console.log(`printkitty-sms listening on port ${port}`)
})
