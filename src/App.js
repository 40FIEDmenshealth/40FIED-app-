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
const TrainView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Training Programs</h2>
        <div className="text-sm text-gray-500">
          {user.plan === 'free' ? 'Free Plan' : 'Premium Plan'}
        </div>
      </div>
      
      <div className="grid gap-4">
        {programs.map((program) => {
          const typeInfo = activityTypes[program.type];
          const IconComponent = typeInfo.icon;
          const isLocked = program.isPremium && user.plan === 'free';
          
          return (
            <div 
              key={program.id} 
              onClick={() => !isLocked && setSelectedProgram(program)}
              className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-200 ${
                isLocked 
                  ? 'opacity-75 cursor-not-allowed' 
                  : 'hover:border-orange-300 hover:shadow-md cursor-pointer transform hover:scale-[1.01]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 ${typeInfo.color} rounded-xl flex items-center justify-center shadow-sm relative`}>
                    <IconComponent className="w-7 h-7 text-white" />
                    {isLocked && (
                      <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-lg text-gray-900">{program.title}</h3>
                      {program.isPremium && (
                        <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs px-2 py-1 rounded-full">
                          Premium
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{program.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-orange-600 font-medium">{program.duration}</span>
                      <span className="text-gray-500">{program.modules.length} modules</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        program.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                        program.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {program.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 ${isLocked ? 'text-gray-300' : 'text-gray-400'}`} />
              </div>
            </div>
          );
        })}
      </div>

      {user.plan === 'free' && (
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-orange-900 mb-1">Unlock All Programs</h3>
              <p className="text-orange-700 text-sm">Get access to advanced programs and personal coaching</p>
            </div>
            <button 
              onClick={() => setShowPayment(true)}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-colors font-medium"
            >
              Upgrade
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const ConnectView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Connect & Community</h2>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-lg mb-4">Success Stories</h3>
        <div className="space-y-4">
          {[
            { name: 'Dave M.', age: 45, story: 'Lost 15 lbs and gained confidence with micro-workouts!', streak: 28 },
            { name: 'Mark R.', age: 42, story: 'Finally sleeping 7+ hours consistently. Game changer.', streak: 21 },
            { name: 'Tony L.', age: 48, story: 'Meditation helped me handle work stress so much better.', streak: 35 }
          ].map((story, index) => (
            <div key={index} className="border-l-4 border-orange-500 pl-4 bg-orange-50/50 p-3 rounded-r-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{story.name}, {story.age}</span>
                <span className="text-sm text-orange-600 font-medium">{story.streak} day streak</span>
              </div>
              <p className="text-gray-700">{story.story}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-lg mb-4">Find Your Accountability Buddy</h3>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4 border border-blue-100">
          <h4 className="font-medium mb-2">Get Matched with Someone Like You</h4>
          <p className="text-gray-700 mb-3 text-sm">Connect with men in your area who share similar goals and schedules</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">47 men waiting for matches</span>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium">
              Find My Buddy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
const renderCurrentView = () => {
    switch(currentView) {
      case 'train': return <TrainView />;
      case 'connect': return <ConnectView />;
      default: return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <div className="text-white font-bold text-sm">4F</div>
              </div>
              <h1 className="text-xl font-bold text-gray-900">40FIED</h1>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 pb-20">
        {renderCurrentView()}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-around py-2">
            {[
              { id: 'home', icon: Home, label: 'Home' },
              { id: 'train', icon: Dumbbell, label: 'Train' },
              { id: 'connect', icon: Users, label: 'Connect' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id)}
                className={`flex flex-col items-center space-y-1 py-3 px-4 rounded-xl transition-all duration-200 ${
                  currentView === tab.id 
                    ? 'text-orange-600 bg-orange-50 shadow-sm transform scale-105' 
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
