import React from 'react';

const PrivacyPolicy: React.FC = () => (
  <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
    <h1 className="text-3xl font-bold text-green-700 mb-6">Privacy Policy</h1>
    <p className="text-gray-700">
      We value your privacy. This policy explains how we collect, use, and protect your personal information when you use Eatalyzer.
    </p>
    <h2 className="text-xl font-semibold text-green-600 mt-6">Information We Collect</h2>
    <ul className="list-disc ml-6 text-gray-700 space-y-2">
      <li>Personal details (name, email, etc.)</li>
      <li>Nutrition and meal data you provide</li>
      <li>Usage data and analytics</li>
    </ul>
    <h2 className="text-xl font-semibold text-green-600 mt-6">How We Use Your Information</h2>
    <ul className="list-disc ml-6 text-gray-700 space-y-2">
      <li>To provide and improve our services</li>
      <li>To personalize your experience</li>
      <li>To communicate with you</li>
      <li>To comply with legal obligations</li>
    </ul>
    <h2 className="text-xl font-semibold text-green-600 mt-6">Your Rights</h2>
    <p className="text-gray-700">
      You have the right to access, update, or delete your personal information. Contact us at support@eatalyzer.com for any privacy-related requests.
    </p>
  </div>
);

export default PrivacyPolicy; 