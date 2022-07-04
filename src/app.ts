import app from "./server";
import { connectToDB } from "./db"

//connect to mongo
connectToDB()

const port = 3000

app.listen(port, () => {
    console.log(`printkitty-sms listening on port ${port}`)
})
