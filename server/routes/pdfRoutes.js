import express from "express";
import upload from "../config/multerConfig.js";
import {
  uploadPdf,
  chatWithPdf,
  resetPdf,
} from "../controllers/pdfController.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  validateUploadFile,
  validateQuestion,
} from "../middlewares/validators.js";

const router = express.Router();

router.post(
  "/upload",
  upload.single("file"),
  validateUploadFile,
  asyncHandler(uploadPdf)
);

router.get(
  "/chat",
  validateQuestion,
  asyncHandler(chatWithPdf)
);

router.post(
  "/reset",
  asyncHandler(resetPdf)
);

export default router;