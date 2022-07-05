import { Router, json  } from "express";
import { updateSMSRecord, updateSMSRecords } from "../db";

const router = Router();
router.use(json());

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
        res.send(JSON.stringify(result))
    }
    else {
        res.status(400).send('Incorrect request format!')
    }
  }
  catch (e) {
    res.status(500).send(`Something went wrong: ${JSON.stringify(e)}`);
  }
});

/**
 * Route for updating multiple SMS records
 * @name post/
 */
router.post("/", async (req, res) => {
  try {
    if(req.body) {
      const result = await updateSMSRecords(req.body)
      res.send(JSON.stringify(result))
    }
    else {
      res.status(400).send('Incorrect request format!')
    }
  }
  catch (e) {
    res.status(500).send(`Something went wrong: ${JSON.stringify(e)}`);
  }
});

export default router;
