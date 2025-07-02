import React, { useState, useEffect } from 'react';
import { ChevronRight, Target, Users, BookOpen, Calendar, Plus, Check, User, Home, Dumbbell, Brain, Heart, Utensils, Eye, Youtube, Star } from 'lucide-react';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [chain, setChain] = useState([]);
  const [todayCompleted, setTodayCompleted] = useState(new Set());
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentStep, setPaymentStep] = useState('plans');
  const [paymentData, setPaymentData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    country: 'Australia'
  });
  const [user, setUser] = useState({
    name: 'Marcus',
    streak: 12,
    totalLinks: 47,
    plan: 'free'
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('fortified_user');
    const savedChain = localStorage.getItem('fortified_chain');
    const savedCompleted = localStorage.getItem('fortified_completed');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedChain) {
      setChain(JSON.parse(savedChain));
    } else {
      initializeChain();
    }
    
    if (savedCompleted) {
      setTodayCompleted(new Set(JSON.parse(savedCompleted)));
    }
  }, []);

  // Save data to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('fortified_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('fortified_chain', JSON.stringify(chain));
  }, [chain]);

  useEffect(() => {
    localStorage.setItem('fortified_completed', JSON.stringify([...todayCompleted]));
  }, [todayCompleted]);

  const initializeChain = () => {
    const emptyChain = Array.from({ length: 40 }, (_, index) => ({
      id: index + 1,
      type: 'empty',
      date: null,
      activity: `Day ${index + 1}`,
      isEmpty: true
    }));

    const sampleProgress = [
      { id: 1, type: 'strength', date: '2025-06-29', activity: 'Push-ups & Squats', isEmpty: false },
      { id: 2, type: 'mental', date: '2025-06-29', activity: 'Morning Meditation', isEmpty: false },
      { id: 3, type: 'missed', date: '2025-06-28', activity: 'Missed Day', isEmpty: false },
      { id: 4, type: 'nutrition', date: '2025-06-27', activity: 'Protein Goal Met', isEmpty: false },
      { id: 5, type: 'nature', date: '2025-06-26', activity: 'Nature Walk', isEmpty: false },
    ];

    const chainWithProgress = emptyChain.map((slot) => {
      const progress = sampleProgress.find(p => p.id === slot.id);
      return progress || slot;
    });

    setChain(chainWithProgress);
  };

  const pricingPlans = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: 29,
      period: 'month',
      description: 'Perfect for getting started',
      features: [
        'All premium programs',
        'Weekly live group calls',
        'Advanced analytics',
        'Exclusive community access'
      ],
      popular: false
    },
    {
      id: 'annual',
      name: 'Annual',
      price: 199,
      originalPrice: 348,
      period: 'year',
      description: 'Best value - save 43%',
      features: [
        'All premium programs',
        'Weekly live group calls',
        'Advanced analytics',
        'Exclusive community access',
        'Bonus: Living 40FIED book',
        'Bonus: One-on-one strategy call'
      ],
      popular: true
    }
  ];
  const handlePaymentSubmit = async () => {
    setPaymentStep('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setUser(prev => ({ ...prev, plan: 'premium' }));
      setPaymentStep('success');
      
      setTimeout(() => {
        setShowPayment(false);
        setPaymentStep('plans');
        setCurrentView('home');
      }, 3000);
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    const formatted = numbers.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.slice(0, 19);
  };

  const formatExpiryDate = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return numbers.slice(0, 2) + '/' + numbers.slice(2, 4);
    }
    return numbers;
  };

  const activityTypes = {
    mobility: { color: 'bg-green-500', icon: Target, label: 'Joint Mobility' },
    strength: { color: 'bg-gray-500', icon: Dumbbell, label: 'Strength' },
    cardio: { color: 'bg-blue-500', icon: Heart, label: 'Cardiovascular Health' },
    nutrition: { color: 'bg-orange-500', icon: Utensils, label: 'Nutrition' },
    mental: { color: 'bg-purple-500', icon: Brain, label: 'Mental Fitness' },
    nature: { color: 'bg-emerald-500', icon: () => (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5 3l14 9-9 14-5-13z" />
      </svg>
    ), label: 'Nature & Hiking' },
    missed: { color: 'bg-red-500', icon: Eye, label: 'Missed Session' },
    empty: { color: 'bg-gray-200 border-2 border-gray-300 border-dashed', icon: Plus, label: 'Awaiting Action' }
  };

  const programs = [
    { 
      id: 1,
      title: 'Foundation Builder', 
      description: 'Essential strength movements for men over 40', 
      duration: '4 weeks', 
      type: 'strength',
      difficulty: 'Beginner',
      modules: [
        { id: 1, title: 'Proper Push-up Form', videoId: 'dQw4w9WgXcQ', description: 'Master the foundation of upper body strength', duration: '8 min' },
        { id: 2, title: 'Bodyweight Squats Mastery', videoId: 'dQw4w9WgXcQ', description: 'Build lower body power safely', duration: '6 min' },
        { id: 3, title: 'Core Fundamentals', videoId: 'dQw4w9WgXcQ', description: 'Strengthen your center without back pain', duration: '7 min' }
      ]
    },
    { 
      id: 2,
      title: 'Joint Freedom', 
      description: 'Daily mobility to keep you moving well', 
      duration: '3 weeks', 
      type: 'mobility',
      difficulty: 'Beginner',
      modules: [
        { id: 1, title: 'Morning Hip Opener', videoId: 'dQw4w9WgXcQ', description: 'Start your day with better movement', duration: '4 min' },
        { id: 2, title: 'Shoulder & Neck Release', videoId: 'dQw4w9WgXcQ', description: 'Combat desk posture problems', duration: '5 min' }
      ]
    },
    { 
      id: 3,
      title: 'Mental Fortress', 
      description: 'Build unshakeable mental resilience', 
      duration: '6 weeks', 
      type: 'mental',
      difficulty: 'Intermediate',
      isPremium: true,
      modules: [
        const ChainVisualization = () => (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 mb-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent"></div>
      <div className="relative">
        <h3 className="text-white text-xl font-bold mb-2">40FIED Challenge - Don't Break the Chain!</h3>
        <p className="text-gray-300 text-sm mb-6">Build lasting habits with 40 consecutive days of action</p>
        
        <div className="grid grid-cols-10 gap-1.5 mb-6">
          {chain.map((link, index) => {
            const typeInfo = activityTypes[link.type];
            const isMissed = link.type === 'missed';
            const isEmpty = link.isEmpty;
            const IconComponent = typeInfo.icon;
            
            return (
              <div key={link.id} className="relative group">
                <div className={`w-8 h-8 ${typeInfo.color} rounded-lg flex items-center justify-center transform hover:scale-110 transition-all duration-200 ${
                  isMissed ? 'animate-pulse shadow-lg shadow-red-500/25' : ''
                } ${!isEmpty ? 'shadow-lg' : ''}`}>
                  <IconComponent className={`w-3.5 h-3.5 ${isEmpty ? 'text-gray-400' : 'text-white'} ${isMissed ? 'animate-pulse' : ''}`} />
                </div>
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {isEmpty ? `Day ${index + 1}: ${link.activity}` : link.activity}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-gray-300 text-sm">
            Progress: <span className="text-orange-400 font-bold text-lg">{chain.filter(link => !link.isEmpty).length}/40</span> days
          </div>
          <div className="text-gray-300 text-sm">
            Streak: <span className="text-green-400 font-bold text-lg">{user.streak}</span> days
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-orange-500">
          <p className="text-orange-300 text-sm font-medium">40 consecutive days builds lasting change.</p>
          <p className="text-gray-400 text-xs mt-1">Champions stumble but get back up immediately.</p>
        </div>
      </div>
    </div>
  );

  const HomeView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative">
          <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
          <p className="opacity-90">Build your strength and resilience one link at a time</p>
        </div>
      </div>

      <ChainVisualization />

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-orange-600" />
          Today's Activities
        </h3>
        <div className="space-y-3">
          {todaysActivities.map((activity) => {
            const isCompleted = todayCompleted.has(activity.id);
            const typeInfo = activityTypes[activity.type];
            const IconComponent = typeInfo.icon;
            
            return (
              <div key={activity.id} className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                isCompleted 
                  ? 'bg-green-50 border-green-200 shadow-sm' 
                  : 'bg-gray-50 border-gray-200 hover:border-orange-300 hover:shadow-md'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${typeInfo.color} rounded-xl flex items-center justify-center shadow-sm`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{activity.title}</h4>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{activity.duration}</span>
                  </div>
                </div>
                <button
                  onClick={() => completeActivity(activity.id, activity.type, activity.title)}
                  className={`p-3 rounded-xl transition-all duration-200 ${
                    isCompleted 
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/25' 
                      : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transform hover:scale-105'
                  }`}
                  disabled={isCompleted}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
