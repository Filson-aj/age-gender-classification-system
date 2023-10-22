import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import * as faceapi from 'face-api.js';

import Landing from "./Components/Landing";
import ChildrenFemales from "./Components/Children/Females/ChildrenFemales";
import ChildrenMales from "./Components/Children/Males/ChildrenMales";
import AdultFemales from "./Components/Adults/Females/AdultFemales";
import AdultMales from "./Components/Adults/Males/AdultMales";

const MODEL_URL = '/models';

const App = () =>{
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [videoStarted, setVideoStarted] = useState(false);
  const [data, setData] = useState({
    gender: '',
    age: null,
    category: '',
    accuracy: null,
  });
  let truthcee = 6;

  const loadModels = async() =>{//handdles loading of detection models
      await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
          faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
      ]);
      setLoading(false);
  };

  const classifyGenderAge = async () => {//handles the classification
    const videoEl = videoRef.current;
  
    const detections = await faceapi.detectAllFaces(videoEl, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender();

    if(detections.length <= 0){
      return classifyGenderAge();
    }
    //console.log(detections);
    if(truthcee > 0){
      truthcee--;
      return classifyGenderAge();
    }
    detections.forEach((detection) => {
      const { age, gender, genderProbability } = detection;
      let category = '';
      if(age < 18){
        category = 'Child';
      }else if(age <= 35){
        category = 'Young Adult';
      }else{
        category = 'Adult';
      }
      setData({
        age: faceapi.utils.round(age, 0),
        category,
        gender,
        accuracy: faceapi.utils.round(genderProbability),
      });
      if(truthcee <= 0){
        setTimeout(() => {
          handleNavigate(category, gender);
        }, 2000);
      }
  });
    return;
};

  const startVideo = async () => {//handles starting video feeds
    try {
      await loadModels();
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

  const stopVideo = () => {//handle stoping video feeds
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

  const handleNavigate = (category, gender) =>{//handles navigation based on the age category and gender of the user
    if(category.toLowerCase() === 'child'){
      if(gender.toLowerCase() === 'female'){
        navigate('/childrens/females');
      }else{
        navigate('/childrens/males');
      }
    }else{
      if(gender.toLowerCase() === 'female'){
        navigate('/adults/females');
      }else{
        navigate('/adults/males');
      }
    }
  };

  return(
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 py-4">
        <h1 className="text-4xl font-bold text-center">SmartAds: Personalized Advertising</h1>
      </header>
      <main className="flex-grow flex  bg-gray-200">
        <aside className="w-1/5 bg-gray-200 px-2 border-t border-b">
            <div className="mb-2">
                <h2 className="text-lg font-bold text-gray-800 text-center">Video Feed</h2>
                <div className="bg-gray-50 h-64 rounded shadow">
                  {loading ? <p className="text-red-500 text-center mt-4 bg-pink-700 text-red-100">
                   Click on start to laod video feeds...</p> : 
                  <div className="relative p-2">
                    <video ref={videoRef} crossOrigin="anonymous" autoPlay muted width="440" height="280" />
                    <canvas ref={canvasRef} id="overlay" className="absolute inset-0"/>
                  </div>}  
                </div>
            </div>
            <div className='mb-2'>
                <h2 className="text-lg font-bold text-gray-800 text-center">Detected Information</h2>
                <div className="bg-gray-50 h-64 rounded shadow text-gray-800 items-left">
                    <div className="p-4 border-b border-gray-200">
                        <strong>Age:</strong> <span>{data.age} {data.age && 'years old.'}</span>
                    </div>
                    <div className="p-4 border-b border-gray-200">
                        <strong>Category:</strong> <span>{data.category}</span>
                    </div>
                    <div className="p-4 border-b border-gray-200">
                        <strong>Gender:</strong> <span>{data.gender && `${data.gender.toUpperCase()} ${data.accuracy * 100}%`}</span>
                    </div>
                </div>
            </div>
        </aside>
        <section className="w-4/5 p-8 bg-white rounded shadow m-4 text-center">
          <Routes>
              <Route exact path="/" element={<Landing videoStarted={videoStarted}
                startVideo={startVideo} stopVideo={stopVideo} />} />
              <Route exact path="/childrens/females" element={<ChildrenFemales />} />
              <Route exact path="/adults/females" element={<AdultFemales />} />
              <Route exact path="/childrens/males" element={<ChildrenMales />} />
              <Route exact path="/adults/males" element={<AdultMales />} />
          </Routes>
        </section>
      </main>
      <footer className="bg-gray-700 py-4 text-center">
        <p>© 2023 NACESR Project. All rights reserved. <br/>
          MUSA ZUBAIRU INUWA (NACEST/COM/HND21/676)</p> 
      </footer>
    </div>
  );
};

export default App;
