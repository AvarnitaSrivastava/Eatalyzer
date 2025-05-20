import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, CreditCard } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Plans = () => {
  const { subscription, setSubscription } = useApp();
  const [billingPeriod, setBillingPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  
  // Plan features
  const features = {
    basic: {
      title: 'Basic',
      price: {
        weekly: 0,
        monthly: 0,
        yearly: 0
      },
      features: [
        { text: 'Food recognition', included: true },
        { text: 'Basic calorie counting', included: true },
        { text: 'Basic nutrition tracking', included: true },
        { text: '5 food scans per day', included: true },
        { text: 'Simple food database', included: true },
        { text: 'Personalized recommendations', included: false },
        { text: 'Macro tracking', included: false },
        { text: 'Meal plan generator', included: false },
        { text: 'Progress reports', included: false },
        { text: 'Premium food database', included: false },
      ]
    },
    weekly: {
      title: 'Weekly',
      price: {
        weekly: 4.99,
        monthly: 19.96,
        yearly: 259.48
      },
      features: [
        { text: 'Food recognition', included: true },
        { text: 'Advanced calorie counting', included: true },
        { text: 'Detailed nutrition tracking', included: true },
        { text: 'Unlimited food scans', included: true },
        { text: 'Extended food database', included: true },
        { text: 'Personalized recommendations', included: true },
        { text: 'Macro tracking', included: true },
        { text: 'Meal plan generator', included: false },
        { text: 'Progress reports', included: false },
        { text: 'Premium food database', included: false },
      ]
    },
    monthly: {
      title: 'Monthly',
      price: {
        weekly: 3.74,
        monthly: 14.99,
        yearly: 179.88
      },
      features: [
        { text: 'Food recognition', included: true },
        { text: 'Advanced calorie counting', included: true },
        { text: 'Detailed nutrition tracking', included: true },
        { text: 'Unlimited food scans', included: true },
        { text: 'Extended food database', included: true },
        { text: 'Personalized recommendations', included: true },
        { text: 'Macro tracking', included: true },
        { text: 'Meal plan generator', included: true },
        { text: 'Progress reports', included: true },
        { text: 'Premium food database', included: false },
      ]
    },
    yearly: {
      title: 'Yearly',
      price: {
        weekly: 2.50,
        monthly: 10.00,
        yearly: 119.99
      },
      features: [
        { text: 'Food recognition', included: true },
        { text: 'Advanced calorie counting', included: true },
        { text: 'Detailed nutrition tracking', included: true },
        { text: 'Unlimited food scans', included: true },
        { text: 'Extended food database', included: true },
        { text: 'Personalized recommendations', included: true },
        { text: 'Macro tracking', included: true },
        { text: 'Meal plan generator', included: true },
        { text: 'Progress reports', included: true },
        { text: 'Premium food database', included: true },
      ]
    }
  };
  
  const selectPlan = (plan: 'free' | 'weekly' | 'monthly' | 'yearly') => {
    setSubscription(plan);
  };
  
  const isPlanSelected = (plan: string) => {
    if (plan === 'basic') return subscription === 'free';
    return subscription === plan;
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <motion.h1 
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Choose Your Plan
        </motion.h1>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Select the perfect plan to help you achieve your nutrition and health goals
        </motion.p>
      </div>
      
      {/* Billing Toggle */}
      <motion.div 
        className="max-w-xs mx-auto mb-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="bg-white rounded-lg shadow-sm p-1 flex">
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              billingPeriod === 'weekly' 
                ? 'bg-green-500 text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setBillingPeriod('weekly')}
          >
            Weekly
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              billingPeriod === 'monthly' 
                ? 'bg-green-500 text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setBillingPeriod('monthly')}
          >
            Monthly
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
              billingPeriod === 'yearly' 
                ? 'bg-green-500 text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setBillingPeriod('yearly')}
          >
            Yearly
          </button>
        </div>
        {billingPeriod === 'yearly' && (
          <div className="mt-2 text-center">
            <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Save 33% compared to monthly
            </span>
          </div>
        )}
      </motion.div>
      
      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Basic Plan */}
        <PlanCard
          title="Free"
          description="Basic features to get started"
          price={0}
          period={billingPeriod}
          features={features.basic.features}
          isPopular={false}
          isSelected={isPlanSelected('basic')}
          onSelect={() => selectPlan('free')}
        />
        
        {/* Weekly Plan */}
        <PlanCard
          title="Weekly"
          description="Perfect for short-term goals"
          price={features.weekly.price[billingPeriod]}
          period={billingPeriod}
          features={features.weekly.features}
          isPopular={false}
          isSelected={isPlanSelected('weekly')}
          onSelect={() => selectPlan('weekly')}
        />
        
        {/* Monthly Plan */}
        <PlanCard
          title="Monthly"
          description="Our most popular plan"
          price={features.monthly.price[billingPeriod]}
          period={billingPeriod}
          features={features.monthly.features}
          isPopular={true}
          isSelected={isPlanSelected('monthly')}
          onSelect={() => selectPlan('monthly')}
        />
        
        {/* Yearly Plan */}
        <PlanCard
          title="Yearly"
          description="Best value for serious goals"
          price={features.yearly.price[billingPeriod]}
          period={billingPeriod}
          features={features.yearly.features}
          isPopular={false}
          isSelected={isPlanSelected('yearly')}
          onSelect={() => selectPlan('yearly')}
          savings="Save 33%"
        />
      </div>
      
      {/* FAQ Section */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <FAQItem 
            question="How accurate is the food recognition?" 
            answer="Our AI-powered food recognition is highly accurate for most common foods and meals. It identifies ingredients and portion sizes with precision, though very complex or unusual dishes may require minor adjustments." 
          />
          <FAQItem 
            question="Can I cancel my subscription anytime?" 
            answer="Yes, you can cancel your subscription at any time. For weekly and monthly plans, your subscription will remain active until the end of the current billing period. For yearly plans, you can request a prorated refund for unused months." 
          />
          <FAQItem 
            question="What's included in the premium food database?" 
            answer="The premium food database includes over 1 million foods with detailed nutritional information, restaurant menu items, international cuisines, and specialty diets. It also provides allergen information and ingredient details." 
          />
          <FAQItem 
            question="Do you offer personalized meal plans?" 
            answer="Yes, our monthly and yearly plans include personalized meal plans based on your dietary preferences, allergies, and nutritional goals. You can generate new meal plans weekly with options for different cuisines and diet types." 
          />
          <FAQItem 
            question="Is there a free trial available?" 
            answer="We offer a 7-day free trial for all paid plans. You can experience all the premium features before committing to a subscription. No credit card required for the trial period." 
          />
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl overflow-hidden">
        <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
          <div className="text-white mb-6 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to transform your nutrition?</h2>
            <p className="opacity-90 max-w-xl">
              Start your journey toward better health with Eatalyzer's powerful AI food analysis.
              Join thousands of users who are achieving their health goals.
            </p>
          </div>
          <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
            Start 7-Day Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};

interface PlanCardProps {
  title: string;
  description: string;
  price: number;
  period: 'weekly' | 'monthly' | 'yearly';
  features: Array<{ text: string; included: boolean }>;
  isPopular: boolean;
  isSelected: boolean;
  onSelect: () => void;
  savings?: string;
}

const PlanCard = ({ 
  title, 
  description, 
  price, 
  period, 
  features, 
  isPopular, 
  isSelected,
  onSelect,
  savings 
}: PlanCardProps) => {
  const popularBadge = isPopular ? (
    <div className="absolute top-0 right-0">
      <div className="bg-green-500 text-white text-xs font-bold uppercase py-1 px-2 transform translate-x-2 -translate-y-2 rotate-12 shadow-sm">
        Popular
      </div>
    </div>
  ) : null;
  
  const savingsBadge = savings ? (
    <div className="absolute top-0 left-0">
      <div className="bg-blue-500 text-white text-xs font-bold py-1 px-2 transform -translate-x-2 -translate-y-2 shadow-sm rounded-sm">
        {savings}
      </div>
    </div>
  ) : null;
  
  const periodDisplay = () => {
    if (price === 0) return '';
    switch(period) {
      case 'weekly': return '/week';
      case 'monthly': return '/month';
      case 'yearly': return '/year';
    }
  };
  
  return (
    <motion.div 
      className={`relative rounded-xl overflow-hidden transition-all ${
        isSelected 
          ? 'ring-2 ring-green-500 shadow-lg' 
          : 'border border-gray-200 hover:shadow-md'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      whileHover={{ y: -5 }}
    >
      {popularBadge}
      {savingsBadge}
      
      <div className="bg-white p-6">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-500 text-sm mt-1">{description}</p>
        
        <div className="mt-4 flex items-baseline">
          <span className="text-3xl font-bold">
            {price === 0 ? 'Free' : `$${price.toFixed(2)}`}
          </span>
          <span className="ml-1 text-gray-500">{periodDisplay()}</span>
        </div>
        
        <button
          onClick={onSelect}
          className={`mt-6 w-full py-2 rounded-lg font-medium transition-colors ${
            isSelected 
              ? 'bg-green-500 text-white' 
              : 'bg-white border border-green-500 text-green-600 hover:bg-green-50'
          }`}
        >
          {isSelected ? 'Current Plan' : 'Select Plan'}
        </button>
        
        <div className="mt-6 space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              {feature.included ? (
                <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <X size={18} className="text-gray-300 flex-shrink-0 mt-0.5" />
              )}
              <span className={`ml-2 text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {price > 0 && (
        <div className="bg-gray-50 p-4 text-center text-xs text-gray-500">
          {title === 'Weekly' ? '7-day free trial available' : '7-day free trial available'}
        </div>
      )}
    </motion.div>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        className="flex justify-between items-center w-full text-left font-medium py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
      
      <div className={`mt-2 text-gray-600 text-sm overflow-hidden transition-all ${isOpen ? 'max-h-60' : 'max-h-0'}`}>
        <p className="pb-2">{answer}</p>
      </div>
    </div>
  );
};

export default Plans;
