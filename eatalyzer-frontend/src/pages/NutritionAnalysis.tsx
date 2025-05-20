import React from 'react';

const NutritionAnalysis: React.FC = () => (
  <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
    <h1 className="text-3xl font-bold text-green-700 mb-6">Nutrition Analysis</h1>
    <p className="text-gray-700">
      Our nutrition analysis feature provides detailed breakdowns of your meals, including calories, macronutrients, and more. This helps you make informed dietary choices and stay on track with your health goals.
    </p>
    <h2 className="text-xl font-semibold text-green-600 mt-6">What We Analyze</h2>
    <ul className="list-disc ml-6 text-gray-700 space-y-2">
      <li>Calories</li>
      <li>Proteins, fats, and carbohydrates</li>
      <li>Vitamins and minerals</li>
      <li>Dietary fiber and sugar content</li>
    </ul>
    <h2 className="text-xl font-semibold text-green-600 mt-6">Benefits</h2>
    <ul className="list-disc ml-6 text-gray-700 space-y-2">
      <li>Comprehensive nutritional insights</li>
      <li>Personalized dietary recommendations</li>
      <li>Easy tracking of nutritional goals</li>
    </ul>
  </div>
);

export default NutritionAnalysis;
