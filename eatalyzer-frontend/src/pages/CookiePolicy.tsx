import React from 'react';

const CookiePolicy: React.FC = () => (
  <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
    <h1 className="text-3xl font-bold text-blue-700 mb-6">Cookie Policy</h1>
    <p className="text-gray-700">
      This website uses cookies to ensure you get the best experience. Cookies are small text files stored on your device to help us improve our services, analyze usage, and personalize content.
    </p>
    <h2 className="text-xl font-semibold text-blue-600 mt-6">How We Use Cookies</h2>
    <ul className="list-disc ml-6 text-gray-700 space-y-2">
      <li>To remember your preferences and settings</li>
      <li>To analyze site traffic and usage</li>
      <li>To provide personalized content and recommendations</li>
      <li>To support authentication and security</li>
    </ul>
    <h2 className="text-xl font-semibold text-blue-600 mt-6">Managing Cookies</h2>
    <p className="text-gray-700">
      You can control and delete cookies through your browser settings. Please note that disabling cookies may affect your experience on our site.
    </p>
  </div>
);

export default CookiePolicy; 