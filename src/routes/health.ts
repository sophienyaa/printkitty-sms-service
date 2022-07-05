import { Router } from "express";
import { database } from "../db";

const router = Router();

/**
 * Liveness probe for k8s
 * @name get/
 */
router.get("/", async (req, res) => {
  try {
    if(database) {
        res.status(200).send('OK')
    }
    else {
        res.status(400).send('NO DB')
    }
  }
  catch (e) {
    res.status(500).send(`Something went wrong: ${JSON.stringify(e)}`)
  }
});

export default router;
