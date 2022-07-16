import { Router, json  } from "express";
import { updateSMSRecord } from "../db";
import { RequestError } from "../types";

const router = Router()
router.use(json())
/**
 * Route for updating a single SMS record
 * @name post/:id
 * 
 * @body
 * 
 */
router.post("/:id", async (req, res) => {
  try {

    if(req.params.id && typeof req.params.id === "string") {
        const result = await updateSMSRecord(req.params.id, req.body.status);
        res.status(200).send(result)
    }
    else {
      const reqError: RequestError = {
        code: 400,
        error: 'Incorrect request format'
      }
      res.status(400).send(reqError)
    }
  }
  catch (e) {
    const reqError: RequestError = {
      code: 500,
      error: e
    }
    res.status(500).send(reqError)    
  }
})

/**
 * Route for updating multiple SMS records
 * @name post/
 */
router.post("/", async (req, res) => {
  try {
    if(req.body) {
      //const result = await updateSMSRecords(req.body)
      //res.send(JSON.stringify(result))
    }
    else {
      const reqError: RequestError = {
        code: 400,
        error: 'Incorrect request format'
      }
      res.status(400).send(reqError)
    }
  }
  catch (e) {
    const reqError: RequestError = {
      code: 500,
      error: e
    }
    res.status(500).send(reqError)    
  }
})

export default router
