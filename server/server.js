import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pdfRoutes from "./routes/pdfRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./middlewares/logger.js";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/", pdfRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});