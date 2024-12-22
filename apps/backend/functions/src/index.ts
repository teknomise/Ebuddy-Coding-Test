import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

export const helloWorld = onRequest((req, res) => {
  
  logger.info("Incoming request", {
    method: req.method,
    url: req.url,
    headers: req.headers,
    structuredData: true,
  });

  try {
    res.status(200).send("Hello from Firebase!");
  } catch (error) {
    logger.error("Error processing request", { error });
    res.status(500).send("An error occurred.");
  }
});
