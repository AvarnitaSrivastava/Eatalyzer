import React from 'react';

const AIFoodRecognition: React.FC = () => (
  <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
    <h1 className="text-3xl font-bold text-green-700 mb-6">AI Food Recognition</h1>
    <p className="text-gray-700">
      Our AI-powered food recognition system uses advanced machine learning models to automatically identify foods from images. Simply upload a photo of your meal, and our system will analyze it to provide accurate nutritional information.
    </p>
    <h2 className="text-xl font-semibold text-green-600 mt-6">How It Works</h2>
    <ul className="list-disc ml-6 text-gray-700 space-y-2">
      <li>Upload an image of your food</li>
      <li>Our AI model processes the image in real-time</li>
      <li>Get instant recognition and nutritional details</li>
    </ul>
    <h2 className="text-xl font-semibold text-green-600 mt-6">Benefits</h2>
    <ul className="list-disc ml-6 text-gray-700 space-y-2">
      <li>Quick and accurate food identification</li>
      <li>Seamless integration with nutrition tracking</li>
      <li>Enhanced user experience</li>
    </ul>
  </div>
);

export default AIFoodRecognition; 