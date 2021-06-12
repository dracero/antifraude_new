import React, { useState } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import * as blazeface from "@tensorflow-models/blazeface";

export default function App() {
  var webcam;
  let model;
  const [counta, setCounta] = useState(0);
  const [countb, setCountb] = useState(0);
  const videoConstraints = {
    width: 156,
    height: 156,
    facingMode: "user" // si rinden con celular toma la cámara frontal
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
    while (true) {
      if (classifier.getNumClasses() > 0) {
        //detectcion de rostro
        if (!model) model = await blazeface.load();
        const returnTensors = false;
        const predictions = await model.estimateFaces(
          window.webcamElement,
          returnTensors
        );
        if ((predictions.length < 1 || predictions.length < 1) && b >= 20) {
          alert("Se fué"); //acà detecta la cantidad de rostros
        }
        //fin detección de rostro
        const img = await webcam.capture();
        // Get the activation from mobilenet from the webcam.
        const activation = net.infer(img, "conv_preds");
        // Get the most likely class and confidence from the classifier module.
        const result = await classifier.predictClass(activation);
        if (a >= 20 && document.getElementById("class-a")) {
          document
            .getElementById("class-a")
            .setAttribute("disabled", "disabled");
        }
        if (b >= 20 && document.getElementById("class-b")) {
          document
            .getElementById("class-b")
            .setAttribute("disabled", "disabled");
        }
        const classes = ["A", "B"];
        document.getElementById("console").innerText = `
      prediction: ${classes[result.label]}\n
      probability: ${result.confidences[result.label]}
    `;
        if (
          b >= 20 &&
          result.confidences[result.label] >= 0.6 &&
          classes[result.label] === "B"
        ) {
          if (this.webcam1.getScreenshot()){
                var fraude = this.webcam1.getScreenshot();
          }    
          console.log(fraude);
          alert("Te estás copiando");
        }
        // Dispose the tensor to release the memory.
        img.dispose();
      }

      await tf.nextFrame();
    }
  }

  const capturea = () => {
    if (counta >= 20 && this.webcam1.getScreenshot()){     
      var figa = this.webcam1.getScreenshot();
      console.log(figa);
      setCounta(0);
      return figa;
    } else return null;
  };

  const captureb = () => {
    if (countb >= 20 && this.webcam1.getScreenshot()) {
      var figb = this.webcam1.getScreenshot();
      console.log(figb);
      setCountb(0);
      return figb;
    } else return null;
  };

  return [
    <div>
      <div id="console"></div>
      {video}
      {capturea()}
      {captureb()}
      <button onClick={app} id="video">
        VideoCapture
      </button>
      <button onClick={() => setCounta(counta + 1)} id="class-a">
        Add A
      </button>
      <button onClick={() => setCountb(countb + 1)} id="class-b">
        Add B
      </button>
    </div>
  ];
}
