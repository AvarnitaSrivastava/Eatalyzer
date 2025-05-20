import React from 'react';

const MealTracking: React.FC = () => (
  <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
    <h1 className="text-3xl font-bold text-green-700 mb-6">Meal Tracking</h1>
    <p className="text-gray-700">
      Our meal tracking feature allows you to log your daily meals and monitor your nutrition goals over time. Keep track of what you eat, when you eat, and how it aligns with your dietary targets.
    </p>
    <h2 className="text-xl font-semibold text-green-600 mt-6">Features</h2>
    <ul className="list-disc ml-6 text-gray-700 space-y-2">
      <li>Log meals with ease</li>
      <li>View detailed meal history</li>
      <li>Track progress towards your goals</li>
      <li>Receive insights and suggestions</li>
    </ul>
    <h2 className="text-xl font-semibold text-green-600 mt-6">Benefits</h2>
    <ul className="list-disc ml-6 text-gray-700 space-y-2">
      <li>Stay accountable to your nutrition goals</li>
      <li>Identify patterns and make informed choices</li>
      <li>Enhance your overall health journey</li>
    </ul>
  </div>
);

export default MealTracking; 