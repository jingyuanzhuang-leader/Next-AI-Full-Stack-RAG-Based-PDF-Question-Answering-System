import {
  setCurrentFilePath,
  getCurrentFilePath,
  clearCurrentFile,
  hasCurrentFile,
} from "../services/fileStateService.js";
import { askPdfQuestion } from "../services/chatService.js";
import AppError from "../utils/AppError.js";

export const uploadPdf = async (req, res) => {
  setCurrentFilePath(req.file.path);

  res.json({
    success: true,
    message: `${req.file.path} upload successfully.`,
    fileName: req.file.originalname,
  });
};

export const chatWithPdf = async (req, res) => {
  const question = req.query.question;
  const filePath = getCurrentFilePath();

  if (!hasCurrentFile()) {
    throw new AppError("No PDF file uploaded yet.", 400);
  }

  const result = await askPdfQuestion(filePath, question);

  res.json({
    success: true,
    answer: result.answer,
    sourcePages: result.sourcePages || [],
  });
};

export const resetPdf = async (req, res) => {
  clearCurrentFile();

  res.json({
    success: true,
    message: "Current PDF removed.",
  });
};