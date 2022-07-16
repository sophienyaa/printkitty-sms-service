import { Router, urlencoded } from "express";
import { saveSMSToDB } from "../db";
import { TwilioSMSResponse, RequestError } from "../types";

const router = Router();
router.use(urlencoded({ extended: false }))
/**
 * Route to handle webook calls from twillio, accepts inbound SMS as URL Encoded form data
 * @name post/
 */
router.post("/", async (req, res) => {
  try {
    const sms: TwilioSMSResponse = req.body
    const result = await saveSMSToDB(sms)
    res.status(200).send()
  }
  catch (e) {
    const reqError: RequestError = {
      code: 500,
      error: e
    }
    res.status(500).send(reqError)  
  }
});
  
export default router
