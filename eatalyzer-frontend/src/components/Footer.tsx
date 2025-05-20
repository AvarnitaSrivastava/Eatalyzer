import React from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-700">Eatalyzer</h3>
            <p className="text-gray-700">
              Your AI-powered food analysis companion. Making healthy eating easier and more accessible.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-green-300 transition-colors">
                <FacebookIcon />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-300 transition-colors">
                <TwitterIcon />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-300 transition-colors">
                <InstagramIcon />
              </a>
              <a href="#" className="text-gray-500 hover:text-green-300 transition-colors">
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-green-300 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/scan" className="text-gray-600 hover:text-green-300 transition-colors">
                  Scan Food
                </Link>
              </li>
              <li>
                <Link to="/plans" className="text-gray-600 hover:text-green-300 transition-colors">
                  Plans
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-green-300 transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-600 hover:text-green-300 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-green-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Features</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/ai-food-recognition" className="text-gray-700 hover:text-green-300 transition-colors">
                  AI Food Recognition
                </Link>
              </li>
              <li>
                <Link to="/nutrition-analysis" className="text-gray-700 hover:text-green-300 transition-colors">
                  Nutrition Analysis
                </Link>
              </li>
              <li>
                <Link to="/meal-tracking" className="text-gray-700 hover:text-green-300 transition-colors">
                  Meal Tracking
                </Link>
              </li>
              <li>
                <Link to="/dietary-suggestions" className="text-gray-700 hover:text-green-300 transition-colors">
                  Dietary Suggestions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">Contact Us</h4>
            <ul className="space-y-2">
              <li className="text-gray-700">support@eatalyzer.com</li>
              <li className="text-gray-700">1-800-EAT-ALYZ</li>
              <li className="text-gray-700">123 Health Street</li>
              <li className="text-gray-700">Wellness City, WC 12345</li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-green-300 transition-colors">
                  Contact Form
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2025 Eatalyzer. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-500 hover:text-green-300 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-green-300 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="text-gray-500 hover:text-green-300 text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 