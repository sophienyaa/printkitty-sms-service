import { Router } from "express";
import { getAllSMS, getSMSByStatus } from "../db";
import { RequestError, SMSStatus } from "../types";

const router = Router();
/**
 * Route for getting all SMS's with a given status
 * @name get/:status
 */
router.get("/:status", async (req, res) => {
  try {
    if(req.params.status && typeof req.params.status === "string") {
      if (!Object.values(SMSStatus).includes(req.params.status as string as SMSStatus)) {
        const reqError: RequestError = {
          code: 400,
          error: 'Invalid URL: valid URLs are PENDING, ERROR, COMPLETE e.g /getSMS/PENDING'
        }
        res.status(400).send(reqError)
      }
      else {
        const result = await getSMSByStatus(req.params.status)
        res.status(200).send(result)
      }
    }
    else {
      throw 'Unknown error'
    }
  }
  catch (e) {
    const reqError: RequestError = {
      code: 500,
      error: e
    }
    res.status(500).send(reqError)
  }
});
/**
 * Route for getting all SMS in the DB
 * @name get
 */
 router.get("/", async (req, res) => {
  try {
    const result = await getAllSMS()
    res.status(200).send(result)
  }
  catch (e) {
    const reqError: RequestError = {
      code: 500,
      error: e
    }
    res.status(500).send(reqError)
  }
});

export default router;
