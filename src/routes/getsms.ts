import { Router } from "express";
import { getSMSByStatus } from "../db";

const router = Router();

router.get("/:status", async (req, res) => {
  try {
    if(req.params.status && typeof req.params.status === "string") { 
      const result = await getSMSByStatus(req.params.status)
      res.send(result)
    }
    else {
      res.status(400).send('Incorrect request format!');
    }
  }
  catch (e) {
    res.status(500).send(`Something went wrong: ${JSON.stringify(e)}`);
  }
});

export default router;