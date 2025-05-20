import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Webcam from 'react-webcam';
import CameraIcon from '@mui/icons-material/Camera';
import UploadIcon from '@mui/icons-material/Upload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

interface AnalysisResult {
  suggestions: {
    message: string;
    suggestions: string[];
  };
  recognized_foods: string[];
  nutrition_info: Array<{
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    source: string;
  }>;
  total_calories: number;
  target_calories: number;
}

const ScanFood: React.FC = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setIsCameraActive(false);
      setAnalysisResult(null);
      setError(null);
    }
  };

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setPreviewUrl(imageSrc);
        // Convert base64 to File object
        fetch(imageSrc)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
            setSelectedFile(file);
            setAnalysisResult(null);
            setError(null);
          });
      }
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      // Get user ID from localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      formData.append('user_id', user.id);

      const response = await axios.post('http://localhost:8000/analyze-meal-image/', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Analysis response:', response.data);
      setAnalysisResult(response.data);
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-500">Scan Food</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsCameraActive(!isCameraActive)}
            className={`flex items-center px-4 py-2 rounded-lg ${
              isCameraActive
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            } transition-colors`}
          >
            <CameraIcon className="w-5 h-5 mr-2" />
            {isCameraActive ? 'Stop Camera' : 'Use Camera'}
          </button>
          <label className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <UploadIcon className="w-5 h-5 mr-2" />
            Upload Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </label>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {isCameraActive ? (
          <div className="relative">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full h-[500px] object-cover"
            />
            <button
              onClick={handleCapture}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <CameraIcon className="w-8 h-8 text-blue-600" />
            </button>
          </div>
        ) : previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-[500px] object-cover"
            />
            <button
              onClick={() => {
                setPreviewUrl(null);
                setSelectedFile(null);
                setAnalysisResult(null);
                setError(null);
              }}
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="h-[500px] flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <CameraIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No image selected</p>
              <p className="text-sm text-gray-400 mt-2">
                Use the camera or upload a photo to get started
              </p>
            </div>
          </div>
        )}
      </div>

      {previewUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Ready to Analyze
          </h2>
          <div className="flex items-center space-x-4">
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
            <p className="text-gray-600">
              Image captured successfully. Click analyze to get detailed nutritional
              information.
            </p>
          </div>
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className={`mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors ${
              isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {analysisResult && (
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Analysis Results</h3>
              
             

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Recognized Foods:</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {analysisResult.recognized_foods.map((food: string, index: number) => (
                    <li key={index}>{food}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Nutrition Information:</h4>
                <div className="space-y-2">
                  {analysisResult.nutrition_info.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="font-medium text-gray-700">{item.name}</div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Calories</span>
                        <span className="text-gray-900">{item.calories} kcal</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Protein</span>
                        <span className="text-gray-900">{item.protein} g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Carbs</span>
                        <span className="text-gray-900">{item.carbs} g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fat</span>
                        <span className="text-gray-900">{item.fat} g</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Total Calories:</h4>
                <p className="text-gray-600">
                  {analysisResult.total_calories} calories
                </p>
              </div>

              {analysisResult && analysisResult.suggestions.suggestions.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Suggestions:</h4>
                  <ul className="space-y-2">
                    {analysisResult.suggestions.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-gray-700">{suggestion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ScanFood;