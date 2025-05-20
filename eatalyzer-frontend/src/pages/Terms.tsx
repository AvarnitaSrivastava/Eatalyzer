import React from 'react';

const Terms: React.FC = () => (
  <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
    <h1 className="text-3xl font-bold text-green-700 mb-6">Terms of Service</h1>
    <p className="text-gray-700">
      By using Eatalyzer, you agree to the following terms and conditions. Please read them carefully.
    </p>
    <h2 className="text-xl font-semibold text-green-600 mt-6">Use of Service</h2>
    <ul className="list-disc ml-6 text-gray-700 space-y-2">
      <li>You must be at least 13 years old to use this service.</li>
      <li>Do not misuse or attempt to disrupt the service.</li>
      <li>Respect the privacy and rights of other users.</li>
    </ul>
    <h2 className="text-xl font-semibold text-green-600 mt-6">Limitation of Liability</h2>
    <p className="text-gray-700">
      Eatalyzer is provided as-is without warranties. We are not liable for any damages arising from the use of this service.
    </p>
    <h2 className="text-xl font-semibold text-green-600 mt-6">Contact</h2>
    <p className="text-gray-700">
      For questions about these terms, contact us at support@eatalyzer.com.
    </p>
  </div>
);

export default Terms; 