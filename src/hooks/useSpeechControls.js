import { useEffect, useState } from "react";
import { message } from "antd";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { LANGUAGE_MAP } from "../constants/config";
import {
  createSpeechInstance,
  speakText,
  stopSpeaking,
} from "../utils/speech";

const useSpeechControls = ({ onTranscriptChange }) => {
  const [speech, setSpeech] = useState(null);
  const [speechReady, setSpeechReady] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("zh-CN");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    const initSpeech = async () => {
      try {
        const speechInstance = await createSpeechInstance(selectedLanguage);
        setSpeech(speechInstance);
        setSpeechReady(true);
      } catch (error) {
        console.error("Speech init error:", error);
        setSpeechReady(false);
      }
    };

    initSpeech();
  }, [selectedLanguage]);

  useEffect(() => {
    if (transcript && onTranscriptChange) {
      onTranscriptChange(transcript);
    }
  }, [transcript, onTranscriptChange]);

  const startRecording = async () => {
    if (!browserSupportsSpeechRecognition) {
      message.error("当前浏览器不支持语音识别，建议使用 Chrome");
      return;
    }

    try {
      resetTranscript();
      await SpeechRecognition.startListening({
        continuous: true,
        language: selectedLanguage,
      });
      message.success(`开始录音（${LANGUAGE_MAP[selectedLanguage]}）`);
    } catch (error) {
      console.error(error);
      message.error("无法开始录音");
    }
  };

  const stopRecording = async () => {
    try {
      await SpeechRecognition.stopListening();
      message.success("录音已停止");
    } catch (error) {
      console.error(error);
      message.error("停止录音失败");
    }
  };

  const readText = async (text) => {
    if (!text) {
      message.warning("当前没有可朗读的内容");
      return;
    }

    if (!speechReady || !speech) {
      message.error("语音朗读暂时不可用");
      return;
    }

    try {
      await speakText(speech, selectedLanguage, text);
    } catch (error) {
      console.error(error);
      message.error("朗读失败");
    }
  };

  const stopReading = async () => {
    if (!speech) {
      message.warning("当前没有可停止的朗读");
      return;
    }

    try {
      await stopSpeaking(speech);
      message.success("已停止朗读");
    } catch (error) {
      console.error(error);
      message.error("停止朗读失败");
    }
  };

  return {
    selectedLanguage,
    setSelectedLanguage,
    listening,
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    startRecording,
    stopRecording,
    readText,
    stopReading,
  };
};

export default useSpeechControls;