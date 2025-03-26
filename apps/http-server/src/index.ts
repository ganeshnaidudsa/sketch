import express from "express";
import { router } from "./routes/v1";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(cors())
app.use(express.json());
app.use("/api/v1", router)

app.listen(PORT, () => {
  console.log(`app is listening on ${PORT}`);
});
