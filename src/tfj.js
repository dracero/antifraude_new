import React from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import Sonido from "./Sonido";

export default function App() {
  var webcam;
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
        if (a === 20) {
          document
            .getElementById("class-a")
            .setAttribute("disabled", "disabled");
        }
        if (b === 20) {
          document
            .getElementById("class-b")
            .setAttribute("disabled", "disabled");
          const screenshot = video.getScreenshot();
        }
        if (c === 20) {
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
  return [
    <div>
      <div id="console"></div>
      {video}
      <button onClick={app} id="video">
        VideoCapture
      </button>
      <button id="class-a">Add A</button>
      <button id="class-b">Add B</button>
      <button id="class-c">Add C</button>
      <Sonido />
    </div>
  ];
}
