import React from 'react';

const Features: React.FC = () => (
  <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
    <h1 className="text-3xl font-bold text-blue-700 mb-6">Features</h1>
    <ul className="space-y-6">
      <li>
        <h2 className="text-xl font-semibold text-blue-600">AI Food Recognition</h2>
        <p className="text-gray-700">Automatically recognize foods from images using advanced AI models.</p>
      </li>
      <li>
        <h2 className="text-xl font-semibold text-blue-600">Nutrition Analysis</h2>
        <p className="text-gray-700">Get detailed nutritional breakdowns for your meals, including calories, macros, and more.</p>
      </li>
      <li>
        <h2 className="text-xl font-semibold text-blue-600">Meal Tracking</h2>
        <p className="text-gray-700">Track your daily meals and monitor your nutrition goals over time.</p>
      </li>
      <li>
        <h2 className="text-xl font-semibold text-blue-600">Dietary Suggestions</h2>
        <p className="text-gray-700">Receive personalized suggestions to help you meet your dietary targets and preferences.</p>
      </li>
    </ul>
  </div>
);

export default Features; 