import { Router, urlencoded } from "express";
import { saveSMSToDB } from "../db";
import { twilioSMS } from "../sms";

const router = Router();
router.use(urlencoded({ extended: false }));

/**
 * Route to handle webook calls from twillio, accepts inbound SMS as URL Encoded form data
 * @name post/
 */
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
