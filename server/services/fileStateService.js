import fs from "fs";

let currentFilePath = "";

export const setCurrentFilePath = (filePath) => {
  currentFilePath = filePath;
};

export const getCurrentFilePath = () => {
  return currentFilePath;
};

export const clearCurrentFile = () => {
  if (currentFilePath && fs.existsSync(currentFilePath)) {
    fs.unlinkSync(currentFilePath);
  }

  currentFilePath = "";
};

export const hasCurrentFile = () => {
  return Boolean(currentFilePath);
};