import React, { useEffect, useState } from 'react';
import { 
  Person as PersonIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  LocalDining as FoodIcon,
  Warning as WarningIcon,
  FitnessCenter as FitnessIcon
} from '@mui/icons-material';
import axios from 'axios';

interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  target_calories: number;
  allergies: string[];
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [targetCalories, setTargetCalories] = useState<number>(0);
  const [allergies, setAllergies] = useState<string[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProfile(response.data);
        setTargetCalories(response.data.target_calories);
        setAllergies(response.data.allergies || []);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:8000/users/me', {
        target_calories: targetCalories,
        allergies: allergies
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setIsEditing(false);
      // Refresh profile data
      const response = await axios.get('http://localhost:8000/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setProfile(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <PersonIcon className="w-16 h-16 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              {profile.first_name} {profile.last_name}
            </h1>
            <p className="text-green-100 mt-1">{profile.email}</p>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="flex items-center px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                {isEditing ? (
                  <>
                    <SaveIcon className="mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <EditIcon className="mr-2" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Target Calories Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FitnessIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Daily Calorie Goal</h2>
          </div>
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="number"
                value={targetCalories}
                onChange={(e) => setTargetCalories(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="Enter target calories"
              />
              <p className="text-sm text-gray-500">
                Recommended daily calorie intake based on your activity level and goals
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-3xl font-bold text-blue-600">{profile.target_calories}</p>
              <p className="text-gray-600">calories per day</p>
            </div>
          )}
        </div>

        {/* Allergies Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <WarningIcon className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Dietary Restrictions</h2>
          </div>
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                value={allergies.join(', ')}
                onChange={(e) => setAllergies(e.target.value.split(',').map(a => a.trim()))}
                placeholder="Enter allergies separated by commas"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-sm text-gray-500">
                List any food allergies or dietary restrictions
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {profile.allergies && profile.allergies.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.allergies.map((allergy, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm font-medium"
                    >
                      {allergy}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No dietary restrictions specified</p>
              )}
            </div>
          )}
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow md:col-span-2">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <FoodIcon className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Last Scan</p>
              <p className="text-lg font-semibold text-gray-900">2 hours ago</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Today's Calories</p>
              <p className="text-lg font-semibold text-gray-900">1,850 / {profile.target_calories}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Weekly Average</p>
              <p className="text-lg font-semibold text-gray-900">2,100 cal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 