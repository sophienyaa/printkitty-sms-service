import { Router, urlencoded } from "express";
import { twilioSMS } from "../sms";
import { saveSMSToDB } from "../db";

const router = Router();
router.use(urlencoded({ extended: false }));

router.post("/", async (req, res) => {

  try {
    const sms: twilioSMS = req.body
    const result = await saveSMSToDB(sms)
    res.send(result)
  }
  catch (e) {
    res.status(500).send(`Something went wrong: ${JSON.stringify(e)}`);
  }
  
});
  
export default router;