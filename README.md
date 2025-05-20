# 🍽️ Eatalyzer - AI-Powered Food Analysis Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109.0-009688.svg)](https://fastapi.tiangolo.com/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.15-FF6F00.svg)](https://www.tensorflow.org/)

Eatalyzer is an intelligent food recognition and nutrition analysis platform that helps users make informed dietary choices. Using advanced computer vision and machine learning, Eatalyzer can identify food items from images and provide detailed nutritional information, calorie estimates, and personalized dietary recommendations.

## 🌟 Features

- **Food Recognition**: Upload or take a picture of your food and let our AI identify the ingredients
- **Nutritional Analysis**: Get detailed nutritional information including calories, macros, and micronutrients
- **Dietary Tracking**: Log your meals and track your daily nutritional intake
- **Personalized Recommendations**: Receive food suggestions based on your dietary preferences and goals
- **Meal Planning**: Create and manage personalized meal plans
- **User Authentication**: Secure signup and login system
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **UI Components**: Material-UI (MUI) v5
- **State Management**: React Context API
- **Styling**: Tailwind CSS with Emotion
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Animation**: Framer Motion

### Backend
- **Framework**: FastAPI (Python 3.8+)
- **Database**: SQLite with SQLAlchemy ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Image Processing**: OpenCV, Pillow
- **Machine Learning**:
  - TensorFlow 2.x
  - TensorFlow Hub
  - Custom CNN models
  - Food-101 dataset

### Development Tools
- **Package Manager**: npm/yarn (Frontend), pip (Backend)
- **Build Tool**: Vite
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **Version Control**: Git

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- pip (Python package manager)
- Git

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/AvarnitaSrivastava/Eatalyzer.git
   cd Eatalyzer/eatalyser-backend
   ```

2. Create and activate a virtual environment:
   ```bash
   # On Windows
   python -m venv venv
   .\venv\Scripts\activate
   
   # On macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up the database:
   ```bash
   python -m app.database
   ```

5. Start the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../eatalyzer-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The frontend will be available at `http://localhost:5173`

## 🍽️ Using Eatalyzer

1. **Sign Up/Login**: Create an account or log in to access all features
2. **Upload Food Image**: Take a picture or upload an existing photo of your meal
3. **View Analysis**: Get instant food recognition and nutritional breakdown
4. **Track Meals**: Log your meals to track your daily nutrition
5. **Get Recommendations**: Receive personalized food suggestions based on your goals

## 📚 API Documentation

Once the backend server is running, you can access the interactive API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🤖 Machine Learning Model

Eatalyzer uses a custom-trained CNN model based on the Food-101 dataset. The model is fine-tuned to recognize various food items with high accuracy. The training pipeline includes:

1. Data preprocessing and augmentation
2. Transfer learning with pre-trained models
3. Custom model architecture
4. Training and evaluation

## 📊 Database Schema

The application uses SQLite with the following main tables:

- **users**: Stores user account information
- **meals**: Tracks user meals and nutritional data
- **food_items**: Contains nutritional information for different foods
- **diet_plans**: Stores user diet plans
- **favorites**: Tracks user's favorite food items

## 🧪 Testing

To run the test suite:

```bash
# Navigate to backend directory
cd eatalyser-backend

# Run tests
python -m pytest
```

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

### Project Lead
- **Avarnita Srivastava**
  - GitHub: [@AvarnitaSrivastava](https://github.com/AvarnitaSrivastava)
  - Email: [avarnita1704@gmail.com](mailto:avarnita1704@gmail.com)

### Team Members
- **Dhanya Dwivedi**
  - GitHub: [@dhanya-017](https://github.com/dhanya-017)
  - Email: [dhanyadwivedi170304@gmail.com](mailto:dhanyadwivedi170304@gmail.com)

- **Keshab Kumar Jha**
  - GitHub: [@Keshabkjha](https://github.com/Keshabkjha)
  - Email: [keshabkumarjha876@gmail.com](mailto:keshabkumarjha876@gmail.com)

## 📧 Contact

For any questions or feedback, please reach out to our team:
- [Avarnita Srivastava](mailto:avarnita1704@gmail.com) (Project Lead)
- [Dhanya Dwivedi](mailto:dhanyadwivedi170304@gmail.com)
- [Keshab Kumar Jha](mailto:keshabkumarjha876@gmail.com)

## 🙏 Acknowledgments

- Food-101 dataset for food recognition
- TensorFlow and Keras for deep learning framework
- FastAPI for the robust backend API
- React and Material-UI for the frontend
- All open-source contributors and libraries used in this project

---

<div align="center">
  Made with ❤️ by Team Eatalyzer
</div>