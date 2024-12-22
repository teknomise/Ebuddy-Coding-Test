import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import * as dotenv from "dotenv";

dotenv.config(); 

const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

const app = initializeApp({
  credential: cert(serviceAccount),
});

const db: Firestore = getFirestore(app);

if (process.env.NODE_ENV === "development") {
  console.log("Connecting to Firestore Emulator...");
  process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
}

export { db };
