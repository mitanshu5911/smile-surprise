import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { AnimatePresence } from "framer-motion";

import FloatingHearts from "./FloatingHearts";
import HeartExplosion from "./HeartExplosion";
import LoveFrame from "./LoveFrame";
import messages from "../data/messages";

export default function SmileDetector() {

  const webcamRef = useRef(null);

  const [message, setMessage] = useState("");
  const [showHearts, setShowHearts] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {

    const loadModels = async () => {

      const MODEL_URL = "/models";

      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);

      console.log("Models loaded");

    };

    loadModels();

  }, []);

  const capturePhoto = () => {

    const imageSrc = webcamRef.current.getScreenshot();

    setCapturedImage(imageSrc);

  };

  const detectSmile = async () => {

    if (!webcamRef.current) return;

    const video = webcamRef.current.video;

    if (video.readyState !== 4) return;

    const detection = await faceapi
      .detectSingleFace(
        video,
        new faceapi.TinyFaceDetectorOptions()
      )
      .withFaceExpressions();

    if (detection) {

      const happy = detection.expressions.happy;

      if (happy > 0.75 && !capturedImage) {

        const randomMessage =
          messages[Math.floor(Math.random() * messages.length)];

        setMessage(randomMessage);

        setShowHearts(true);

        // 💥 trigger heart explosion
        setShowExplosion(true);

        capturePhoto();

        setTimeout(() => setShowHearts(false), 2000);

        setTimeout(() => setShowExplosion(false), 1200);

        // remove frame after animation
        setTimeout(() => {
          setCapturedImage(null);
        }, 3000);

      }
    }
  };

  useEffect(() => {

    const interval = setInterval(() => {

      if (!capturedImage) {
        detectSmile();
      }

    }, 900);

    return () => clearInterval(interval);

  }, [capturedImage]);

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-100 to-purple-200">

      <div className="relative bg-white/30 backdrop-blur-lg p-8 rounded-3xl shadow-2xl text-center">

        <h1 className="text-3xl font-bold text-pink-600 mb-4">
          Smile for a Surprise 😊
        </h1>

        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          width={420}
          height={320}
          className="rounded-xl shadow-lg"
        />

        <p className="text-pink-700 text-xl mt-5 font-semibold">
          {message}
        </p>

        {/* floating hearts */}
        {/* <FloatingHearts show={showHearts} /> */}

        {/* heart explosion */}
        <HeartExplosion show={showExplosion} />

      </div>

      {/* Animated photo frame */}
      <AnimatePresence>
        {capturedImage && (
          <LoveFrame image={capturedImage} />
        )}
      </AnimatePresence>

    </div>
  );
}