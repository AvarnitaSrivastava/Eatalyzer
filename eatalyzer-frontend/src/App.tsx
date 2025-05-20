import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ScanFood from './pages/ScanFood';
import Plans from './pages/Plans';
import Profile from './pages/Profile';
import Features from './pages/Features';
import Contact from './pages/Contact';
import CookiePolicy from './pages/CookiePolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import AIFoodRecognition from './pages/AIFoodRecognition';
import NutritionAnalysis from './pages/NutritionAnalysis';
import MealTracking from './pages/MealTracking';
import DietarySuggestions from './pages/DietarySuggestions';
import { AppProvider } from './context/AppContext';

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Layout>{children}</Layout>;
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/scan" element={<ProtectedRoute><ScanFood /></ProtectedRoute>} />
          <Route path="/plans" element={<ProtectedRoute><Plans /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/features" element={<ProtectedRoute><Features /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path="/cookie-policy" element={<ProtectedRoute><CookiePolicy /></ProtectedRoute>} />
          <Route path="/privacy-policy" element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
          <Route path="/terms" element={<ProtectedRoute><Terms /></ProtectedRoute>} />
          <Route path="/ai-food-recognition" element={<ProtectedRoute><AIFoodRecognition /></ProtectedRoute>} />
          <Route path="/nutrition-analysis" element={<ProtectedRoute><NutritionAnalysis /></ProtectedRoute>} />
          <Route path="/meal-tracking" element={<ProtectedRoute><MealTracking /></ProtectedRoute>} />
          <Route path="/dietary-suggestions" element={<ProtectedRoute><DietarySuggestions /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App; 