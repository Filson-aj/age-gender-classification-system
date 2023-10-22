import { useState, useEffect, useRef } from "react";
import * as faceapi from 'face-api.js';

const MODEL_URL = '/models';

const GenderAgeClassifier = () =>{
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [predictions, setPredictions] = useState([]);
    const [videoStarted, setVideoStarted] = useState(false);

    useEffect(() =>{
        const loadModels = async() =>{
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
                faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
            ]);
            setLoading(false);
        };
        loadModels();
    }, []);

    const startVideo = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
    
          videoRef.current.onloadedmetadata = () => {
            setVideoStarted(true);
            classifyGenderAge();
          };
        } catch (error) {
          console.error('Error accessing webcam:', error);
        }
    };

    const stopVideo = () => {
        const videoEl = videoRef.current;
        if (videoEl && videoEl.srcObject) {
          const stream = videoEl.srcObject;
          const tracks = stream.getTracks();
      
          tracks.forEach((track) => {
            track.stop();
          });
      
          videoEl.srcObject = null;
          setVideoStarted(false);
        }
    };

    const classifyGenderAge = async () => {
        const videoEl = videoRef.current;
        const canvas = canvasRef.current;
        const displaySize = { width: videoEl.videoWidth, height: videoEl.videoHeight };
        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(videoEl, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions()
                .withAgeAndGender();

            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
            resizedDetections.forEach((detection) => {
                const { age, gender, genderProbability } = detection;
                const box = detection.detection.box;
                const drawOptions = {
                label: `${faceapi.utils.round(age, 0)} years, ${gender} (${faceapi.utils.round(genderProbability)})`,
                lineWidth: 2,
                boxColor: 'red',
                fontSize: 12
                };
                const drawBox = new faceapi.draw.DrawBox(box, drawOptions);
                drawBox.draw(canvas);
            });

        setPredictions(resizedDetections);
        }, 1000);
    };

    useEffect(() => {
        if (!loading && !predictions.length) {
          if(videoStarted){
            classifyGenderAge();
          }
        }
    }, [loading, predictions, videoStarted]);

    return (
        <div className="flex flex-col items-center space-y-4">
          {loading ? (
            <p>Loading models...</p>
          ) : (
            <>
              <div className="relative p-2">
                <video ref={videoRef} crossOrigin="anonymous" autoPlay muted width="440" height="280" />
                <canvas ref={canvasRef} id="overlay" className="absolute inset-0"/>
              </div>
              <div className="space-x-4 p-4">
                <button
                  className={`px-4 py-2 rounded bg-blue-500 text-white ${videoStarted ? 
                    'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={videoStarted}
                  onClick={startVideo}
                >
                  Start Video
                </button>
                <button
                  className={`px-4 py-2 rounded bg-red-500 text-white ${!videoStarted ? 
                    'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!videoStarted}
                  onClick={stopVideo}
                >
                  Stop Video
                </button>
              </div>
            </>
          )}
        </div>
    );
};

export default GenderAgeClassifier;