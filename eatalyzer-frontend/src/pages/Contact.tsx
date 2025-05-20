import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 space-y-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Contact Us</h1>
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <p className="text-blue-700 font-semibold">Email:</p>
          <p className="text-gray-700">support@eatalyzer.com</p>
        </div>
        <div>
          <p className="text-blue-700 font-semibold">Phone:</p>
          <p className="text-gray-700">1-800-EAT-ALYZ</p>
        </div>
        <div>
          <p className="text-blue-700 font-semibold">Address:</p>
          <p className="text-gray-700">123 Health Street, Wellness City, WC 12345</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="bg-blue-50 rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 mb-2">Send us a message</h2>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400"
          rows={4}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Send
        </button>
        {submitted && <p className="text-green-600 mt-2">Thank you for contacting us!</p>}
      </form>
    </div>
  );
};

export default Contact; 