import React, { useState } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import Sonido from "./Sonido";

export default function App() {
  var webcam;
  const [counta, setCounta] = useState(0);
  const [countb, setCountb] = useState(0);
  const [countc, setCountc] = useState(0);
  const videoConstraints = {
    width: 156,
    height: 156,
    facingMode: "user"
  };
  //acá llamo al video
  const video = (
    <Webcam
      id="webcam"
      audio={false}
      ref={(node) => (this.webcam1 = node)}
      screenshotFormat="image/jpeg"
      videoConstraints={videoConstraints}
    />
  );

  var net;
  var a = 0;
  var b = 0;
  var c = 0;
  const classifier = knnClassifier.create();

  async function app() {
    console.log("Loading mobilenet..");
    // Load the model.
    net = await mobilenet.load();
    console.log("Successfully loaded model");
    document.getElementById("video").setAttribute("disabled", "disabled");
    window.webcamElement = document.getElementById("webcam");
    window.webcamElement.Width = 156;
    window.webcamElement.Height = 156;
    // Create an object from Tensorflow.js data API which could capture image
    // from the web camera as Tensor.
    webcam = await tf.data.webcam(window.webcamElement);
    // Reads an image from the webcam and associates it with a specific class
    // index.
    const addExample = async (classId) => {
      // Capture an image from the web camera.
      const img = await webcam.capture();
      // Get the intermediate activation of MobileNet 'conv_preds' and pass that
      // to the KNN classifier.
      const activation = net.infer(img, true);

      // Pass the intermediate activation to the classifier.
      classifier.addExample(activation, classId);

      // Dispose the tensor to release the memory.
      img.dispose();
    };

    // When clicking a button, add an example for that class.
    document.getElementById("class-a").addEventListener("click", () => {
      addExample(0);
      a = a + 1;
    });
    document.getElementById("class-b").addEventListener("click", () => {
      addExample(1);
      b = b + 1;
    });
    document.getElementById("class-c").addEventListener("click", () => {
      addExample(2);
      c = c + 1;
    });

    while (true) {
      if (classifier.getNumClasses() > 0) {
        const img = await webcam.capture();
        // Get the activation from mobilenet from the webcam.
        const activation = net.infer(img, "conv_preds");
        // Get the most likely class and confidence from the classifier module.
        const result = await classifier.predictClass(activation);
        if (a >= 20) {
          document
            .getElementById("class-a")
            .setAttribute("disabled", "disabled");
        }
        if (b >= 20) {
          document
            .getElementById("class-b")
            .setAttribute("disabled", "disabled");
        }
        if (c >= 20) {
          document
            .getElementById("class-c")
            .setAttribute("disabled", "disabled");
        }
        const classes = ["A", "B", "C"];
        document.getElementById("console").innerText = `
      prediction: ${classes[result.label]}\n
      probability: ${result.confidences[result.label]}
    `;

        // Dispose the tensor to release the memory.
        img.dispose();
      }

      await tf.nextFrame();
    }
  }

  const capturea = () => {
    if (counta >= 20){
       var figa = this.webcam1.getScreenshot();
       console.log(figa)
       setCounta(0)
       return figa
     } else return null
  }
  const captureb = () => {
    if (countb >= 20){
       var figb = this.webcam1.getScreenshot();
       console.log(figb)
       setCountb(0)
       return figb
     } else return null
    }
        
  const capturec = () => {
     if (countc >= 20){
       var figc = this.webcam1.getScreenshot();
       console.log(figc)
       setCountc(0)
       return figc
     } else return null
    }

  return [
    <div>
      <div id="console"></div>
      {video}
      {<img src={capturea()} />}
      {<img src={captureb()} />}
      {<img src={capturec()} />}
      <button onClick={app} id="video">
        VideoCapture
      </button>
      <button onClick={() => setCounta(counta + 1)} id="class-a">
        Add A
      </button>
      <button onClick={() => setCountb(countb + 1)} id="class-b">
        Add B
      </button>
      <button onClick={() => setCountc(countc + 1)} id="class-c">
        Add C
      </button>
      <Sonido />
    </div>
  ];
}
