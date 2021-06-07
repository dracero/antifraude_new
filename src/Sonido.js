import React from "react";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";

const Sonido = () => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  } else {
    SpeechRecognition.startListening({
      continuous: true,
      language: "es-AR"
    });
  }
  if (transcript.split(" ").length > 20) {
    resetTranscript(); //acá tengo que enviar a grabar lo que dice
  }
  return (
    <div>
      <p>{transcript}</p>
    </div>
  );
};
export default Sonido;
