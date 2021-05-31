import React from "react";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";

const Sonido = () => {
  const { transcript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  } else {
    SpeechRecognition.startListening({
      continuous: true,
      language: "es-AR"
    });
  }

  return (
    <div>
      <p>{transcript}</p>
    </div>
  );
};
export default Sonido;
