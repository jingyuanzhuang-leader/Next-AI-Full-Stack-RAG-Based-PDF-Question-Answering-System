import { useEffect, useMemo, useState } from "react";
import { message } from "antd";
import { askQuestion } from "../services/api";

const useChatHistory = ({ uploadedFileName, uploadVersion, resetTranscript }) => {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setChatHistory([]);
    setQuestion("");

    if (resetTranscript) {
      resetTranscript();
    }
  }, [uploadVersion, resetTranscript]);

  const lastAnswer = useMemo(() => {
    if (chatHistory.length === 0) return "";
    return chatHistory[chatHistory.length - 1].answer;
  }, [chatHistory]);

  const handleAsk = async () => {
    if (!uploadedFileName) {
      message.warning("请先上传 PDF");
      return false;
    }

    if (!question.trim()) {
      message.warning("请输入问题");
      return false;
    }

    try {
      setLoading(true);

      const currentQuestion = question;
      const response = await askQuestion(currentQuestion);

      setChatHistory((prev) => [
        ...prev,
        {
          question: currentQuestion,
          answer: response.answer,
          sourcePages: response.sourcePages || [],
          time: new Date().toLocaleTimeString(),
        },
      ]);

      setQuestion("");

      if (resetTranscript) {
        resetTranscript();
      }

      return true;
    } catch (error) {
      console.error(error);
      const backendMessage = error?.response?.data;
      message.error(`提问失败：${backendMessage || error.message}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setChatHistory([]);
    message.success("问答记录已清空");
  };

  return {
    question,
    setQuestion,
    chatHistory,
    loading,
    lastAnswer,
    handleAsk,
    handleClear,
  };
};

export default useChatHistory;