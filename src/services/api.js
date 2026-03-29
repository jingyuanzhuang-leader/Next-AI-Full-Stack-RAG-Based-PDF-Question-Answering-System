import axios from "axios";
import { BASE_URL } from "../constants/config";

export const uploadPdf = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${BASE_URL}/upload`, formData);
  return response.data;
};

export const askQuestion = async (question) => {
  const response = await axios.get(`${BASE_URL}/chat`, {
    params: { question },
  });
  return response.data;
};

export const resetPdf = async () => {
  const response = await axios.post(`${BASE_URL}/reset`);
  return response.data;
};