import { Router, json  } from "express";
import { updateSMSRecord } from "../db";

const router = Router();
router.use(json());

router.post("/:id", async (req, res) => {
  try {

    if(req.params.id && typeof req.params.id === "string") {
        const result = updateSMSRecord(req.params.id, req.body.status);
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
