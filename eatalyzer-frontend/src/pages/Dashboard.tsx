import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Restaurant,
  LocalDining,
  Assessment,
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Scans',
      value: '156',
      icon: <Restaurant className="w-8 h-8 text-green-500" />,
      change: '+12%',
    },
    {
      title: 'Calories Today',
      value: '1,850',
      icon: <LocalDining className="w-8 h-8 text-green-500" />,
      change: '-5%',
    },
    {
      title: 'Weekly Average',
      value: '2,100',
      icon: <Assessment className="w-8 h-8 text-green-500" />,
      change: '+3%',
    },
    {
      title: 'Goals Achieved',
      value: '8/10',
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      change: '+2',
    },
  ];

  const recentScans = [
    {
      id: 1,
      name: 'Grilled Chicken Salad',
      calories: 450,
      time: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    },
    {
      id: 2,
      name: 'Avocado Toast',
      calories: 320,
      time: '4 hours ago',
      image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2',
    },
    {
      id: 3,
      name: 'Greek Yogurt Bowl',
      calories: 280,
      time: '6 hours ago',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a848b919',
    },
  ];

  return (
    <div className="min-h-screen bg-greens-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <button 
            onClick={() => navigate('/scan')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            New Scan
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                {stat.icon}
              </div>
              <div className="mt-4">
                <span
                  className={`text-sm font-medium ${
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-gray-600"> from last week</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Scans */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Scans</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentScans.map((scan) => (
              <div key={scan.id} className="p-6 flex items-center space-x-4">
                <img
                  src={scan.image}
                  alt={scan.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{scan.name}</h3>
                  <p className="text-sm text-gray-500">{scan.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{scan.calories} cal</p>
                  <button className="text-sm text-green-600 hover:text-green-500">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nutrition Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Nutrition Summary</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Protein</span>
                  <span className="text-sm font-medium text-gray-700">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Carbs</span>
                  <span className="text-sm font-medium text-gray-700">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Fat</span>
                  <span className="text-sm font-medium text-gray-700">30%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Progress</h2>
            <div className="h-64 flex items-end space-x-2">
              {[65, 75, 60, 80, 70, 85, 90].map((value, index) => (
                <div key={index} className="flex-1">
                  <div
                    className="bg-green-600 rounded-t"
                    style={{ height: `${value}%` }}
                  ></div>
                  <div className="text-xs text-center text-gray-500 mt-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 