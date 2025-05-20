import React from 'react';

const DietarySuggestions: React.FC = () => (
  <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
    <h1 className="text-3xl font-bold text-green-700 mb-6">Dietary Suggestions</h1>
    <p className="text-gray-700">
      Our dietary suggestions feature provides personalized recommendations to help you meet your nutrition goals. Based on your meal history and preferences, we offer tailored advice to enhance your dietary choices.
    </p>
    <h2 className="text-xl font-semibold text-green-600 mt-6">How It Works</h2>
    <ul className="list-disc ml-6 text-gray-700 space-y-2">
      <li>Analyze your meal history and preferences</li>
      <li>Generate personalized dietary recommendations</li>
      <li>Receive actionable suggestions for improvement</li>
    </ul>
    <h2 className="text-xl font-semibold text-green-600 mt-6">Benefits</h2>
    <ul className="list-disc ml-6 text-gray-700 space-y-2">
      <li>Tailored advice to meet your goals</li>
      <li>Enhanced dietary decision-making</li>
      <li>Improved overall nutrition and health</li>
    </ul>
  </div>
);

export default DietarySuggestions; 