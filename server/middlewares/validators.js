import AppError from "../utils/AppError.js";

export const validateUploadFile = (req, res, next) => {
  if (!req.file) {
    return next(new AppError("No file uploaded.", 400));
  }

  const isPdf =
    req.file.mimetype === "application/pdf" ||
    req.file.originalname.toLowerCase().endsWith(".pdf");

  if (!isPdf) {
    return next(new AppError("Only PDF files are allowed.", 400));
  }

  next();
};

export const validateQuestion = (req, res, next) => {
  const { question } = req.query;

  if (!question || !question.trim()) {
    return next(new AppError("Question is required.", 400));
  }

  next();
};