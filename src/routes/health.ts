import { Router } from "express";
import { database } from "../db";
import { HealthResponse, RequestError } from "../types"

const router = Router();
/**
 * Liveness probe for k8s or similar
 * @name get/
 */
router.get("/", async (req, res) => {
  //TODO: Improve this
  try {
    if(database) {
      const response: HealthResponse = {
        code: 200,
        dbStatus: 'ok',
        apiStatus: 'ok'
      }
        res.status(200).send(response)
    }
    else {
        const response: HealthResponse = {
          code: 500,
          dbStatus: 'error',
          apiStatus: 'error'
        }
        res.status(500).send(response)
    }
  }
  catch (e) {
    const error: RequestError = {
      code: 500,
      error: e
    }
    res.status(500).send(error)
  }
});

export default router;
