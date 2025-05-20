import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home as HomeIcon,
  Camera as CameraIcon,
  Star as StarIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Redirect to home page
    navigate('/');
  };

  const menuItems = [
    { path: '/dashboard', icon: <HomeIcon />, label: 'Dashboard' },
    { path: '/scan', icon: <CameraIcon />, label: 'Scan Food' },
    { path: '/plans', icon: <StarIcon />, label: 'Plans' },
    { path: '/profile', icon: <PersonIcon />, label: 'Profile' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-green-600">Eatalyzer</h1>
          </div>
          <nav className="mt-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-green-300 ${
                  location.pathname === item.path ? 'bg-blue-50 text-blue-600' : ''
                }`}
              >
                {item.icon}
                <span className="mx-3">{item.label}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-green-300 w-full"
            >
              <LogoutIcon />
              <span className="mx-3">Logout</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-8 overflow-auto">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout; 