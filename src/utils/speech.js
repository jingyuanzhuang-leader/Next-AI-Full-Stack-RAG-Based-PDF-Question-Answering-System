import Speech from "speak-tts";

export const createSpeechInstance = async (language) => {
  const speech = new Speech();

  await speech.init({
    volume: 1,
    lang: language,
    rate: 1,
    pitch: 1,
    splitSentences: true,
  });

  return speech;
};

export const speakText = async (speech, language, text) => {
  if (!speech) {
    throw new Error("Speech instance is not ready.");
  }

  await speech.cancel();
  await speech.setLanguage(language);
  await speech.speak({
    text,
  });
};

export const stopSpeaking = async (speech) => {
  if (!speech) {
    throw new Error("Speech instance is not ready.");
  }

  await speech.cancel();
};