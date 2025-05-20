import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, BarChart2, ChevronRight, Award, Zap, Shield } from 'lucide-react';
import HomeNav from '../components/HomeNav';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HomeNav />
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="pt-12 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50 z-[-1]"></div>
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-12">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Understand your food at a{' '}
                <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                  glance
                </span>
              </motion.h1>
              <motion.p 
                className="mt-6 text-xl text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Eatalyzer uses advanced AI to analyze your meals, count calories, 
                and recommend personalized diet adjustments to meet your health goals.
              </motion.p>
              <motion.div 
                className="mt-10 flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link 
                  to="/scan" 
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg shadow-green-200 hover:shadow-green-300 transition-all"
                >
                  <Camera size={20} />
                  Scan Your Food
                </Link>
                <Link 
                  to="/plans" 
                  className="bg-white text-gray-800 border border-gray-200 px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
                >
                  View Plans
                  <ChevronRight size={18} />
                </Link>
              </motion.div>
            </div>
            <motion.div 
              className="lg:w-1/2 mt-12 lg:mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur opacity-20"></div>
                <div className="relative bg-white shadow-xl rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Healthy food plate" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Veggie Bowl</h3>
                        <p className="text-sm text-gray-600">Healthy lunch option</p>
                      </div>
                      <div className="bg-green-100 px-3 py-1 rounded-full text-green-700 font-semibold text-sm">
                        450 cal
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-4 gap-2">
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Protein</div>
                        <div className="font-semibold text-gray-900">22g</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Carbs</div>
                        <div className="font-semibold text-gray-900">48g</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Fat</div>
                        <div className="font-semibold text-gray-900">15g</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Fiber</div>
                        <div className="font-semibold text-gray-900">8g</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                How Eatalyzer Works
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Our AI-powered platform makes nutrition tracking effortless and accurate
              </p>
            </div>
            
            <div className="mt-20 grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <motion.div 
                className="bg-white rounded-xl shadow-md hover:shadow-xl p-8 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <Camera className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Scan Your Plate</h3>
                <p className="text-gray-600">
                  Simply take a photo of your meal and our AI instantly recognizes the food items
                  and portion sizes.
                </p>
              </motion.div>
              
              {/* Feature 2 */}
              <motion.div 
                className="bg-white rounded-xl shadow-md hover:shadow-xl p-8 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                  <BarChart2 className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Nutrition Data</h3>
                <p className="text-gray-600">
                  Receive detailed nutritional information including calories, macros, vitamins,
                  and minerals.
                </p>
              </motion.div>
              
              {/* Feature 3 */}
              <motion.div 
                className="bg-white rounded-xl shadow-md hover:shadow-xl p-8 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="h-14 w-14 rounded-full bg-orange-100 flex items-center justify-center mb-6">
                  <Zap className="h-7 w-7 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personalized Advice</h3>
                <p className="text-gray-600">
                  Get customized meal suggestions and adjustments to help you reach your
                  specific health goals.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Subscription Plans Preview */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Choose Your Plan
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Get personalized nutrition guidance with our flexible subscription options
              </p>
            </div>
            
            <div className="mt-12 grid md:grid-cols-3 gap-8">
              {/* Basic Plan */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900">Weekly</h3>
                  <p className="mt-4 text-gray-600">Perfect for a short-term nutrition boost</p>
                  <div className="mt-6">
                    <span className="text-4xl font-bold text-gray-900">$4.99</span>
                    <span className="text-gray-600">/week</span>
                  </div>
                  <ul className="mt-8 space-y-4">
                    <PlanFeature text="Unlimited food scans" />
                    <PlanFeature text="Basic nutritional analysis" />
                    <PlanFeature text="Weekly meal suggestions" />
                  </ul>
                  <button className="mt-8 w-full py-3 px-4 bg-white border border-green-500 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors">
                    Start Free Trial
                  </button>
                </div>
              </div>
              
              {/* Popular Plan */}
              <div className="bg-white rounded-xl shadow-xl overflow-hidden relative border-2 border-green-500">
                <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-sm font-semibold">
                  POPULAR
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900">Monthly</h3>
                  <p className="mt-4 text-gray-600">Our most popular nutrition plan</p>
                  <div className="mt-6">
                    <span className="text-4xl font-bold text-gray-900">$14.99</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <ul className="mt-8 space-y-4">
                    <PlanFeature text="Unlimited food scans" />
                    <PlanFeature text="Detailed nutritional analysis" />
                    <PlanFeature text="Personalized meal plans" />
                    <PlanFeature text="Progress tracking" />
                  </ul>
                  <button className="mt-8 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all">
                    Start Free Trial
                  </button>
                </div>
              </div>
              
              {/* Premium Plan */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900">Yearly</h3>
                  <p className="mt-4 text-gray-600">Best value for serious health goals</p>
                  <div className="mt-6">
                    <span className="text-4xl font-bold text-gray-900">$129.99</span>
                    <span className="text-gray-600">/year</span>
                  </div>
                  <ul className="mt-8 space-y-4">
                    <PlanFeature text="All Monthly plan features" />
                    <PlanFeature text="Premium meal recommendations" />
                    <PlanFeature text="Nutrition coaching" />
                    <PlanFeature text="30% savings vs monthly" />
                  </ul>
                  <button className="mt-8 w-full py-3 px-4 bg-white border border-green-500 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors">
                    Start Free Trial
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <Link to="/plans" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
                Compare all features
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Our Users Love Eatalyzer
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                See how Eatalyzer is helping people achieve their health goals
              </p>
            </div>
            
            <div className="mt-12 grid md:grid-cols-3 gap-8">
              <TestimonialCard 
                name="Sarah J."
                role="Fitness Enthusiast"
                image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                quote="Eatalyzer has completely changed how I track my nutrition. It's so easy to use and incredibly accurate!"
              />
              <TestimonialCard 
                name="Michael T."
                role="Busy Professional"
                image="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                quote="As someone with a hectic schedule, Eatalyzer helps me stay accountable with my nutrition goals with minimal effort."
              />
              <TestimonialCard 
                name="Emma L."
                role="Weight Loss Journey"
                image="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                quote="I've lost 20 pounds since using Eatalyzer! The personalized recommendations keep me on track."
              />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Start Your Health Journey Today
            </h2>
            <p className="mt-4 text-xl opacity-90 max-w-2xl mx-auto">
              Join thousands of users who are transforming their relationship with food
              using Eatalyzer's powerful AI analysis.
            </p>
            <div className="mt-10">
              <Link 
                to="/scan" 
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                <Camera size={20} />
                Try Free Scan
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const PlanFeature = ({ text }: { text: string }) => (
  <li className="flex items-center">
    <Award className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
    <span className="text-gray-700">{text}</span>
  </li>
);

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  quote: string;
}

const TestimonialCard = ({ name, role, image, quote }: TestimonialCardProps) => (
  <motion.div 
    className="bg-white rounded-xl shadow-md hover:shadow-xl p-8 transition-all duration-300"
    whileHover={{ y: -5 }}
  >
    <div className="flex items-center mb-4">
      <img src={image} alt={name} className="h-12 w-12 rounded-full object-cover" />
      <div className="ml-4">
        <h4 className="text-lg font-semibold text-gray-900">{name}</h4>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
    <p className="text-gray-700 italic">"{quote}"</p>
    <div className="mt-4 flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  </motion.div>
);

export default Home;