import React, { useState, useEffect } from 'react';
import { ChevronRight, Target, Users, Calendar, Plus, Check, User, Home, Dumbbell, Brain, Heart, Utensils, Eye, Youtube, Star } from 'lucide-react';

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
    },
    {
      id: 'personal',
      name: 'Personal Training',
      price: 79,
      period: 'week',
      description: 'Ultimate transformation experience',
      features: [
        'Everything in Monthly plan',
        'One-on-one face-to-face coaching call weekly',
        'Personalized workout programs',
        'Custom nutrition planning',
        'Direct access to your coach',
        'Priority support',
        'Progress tracking & adjustments'
      ],
      popular: false,
      isPremium: true
    }
  ];

  const handlePaymentSubmit = async () => {
    setPaymentStep('processing');
    
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
    nutrition: { color: 'bg-orange-500', icon: () => (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 2l1.68 10.5L6 22h12l1.32-9.5L21 2H3zm16 8H5l-.5-3h14l-.5 3z"/>
      </svg>
    ), label: 'Nutrition' },
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
        { id: 1, title: 'Proper Push-up Form', description: 'Master the foundation of upper body strength', duration: '8 min' },
        { id: 2, title: 'Bodyweight Squats Mastery', description: 'Build lower body power safely', duration: '6 min' },
        { id: 3, title: 'Core Fundamentals', description: 'Strengthen your center without back pain', duration: '7 min' }
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
        { id: 1, title: 'Morning Hip Opener', description: 'Start your day with better movement', duration: '4 min' },
        { id: 2, title: 'Shoulder & Neck Release', description: 'Combat desk posture problems', duration: '5 min' }
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
        { id: 1, title: 'Stress Management Basics', description: 'Tools for handling daily pressure', duration: '9 min' },
        { id: 2, title: 'Building Mental Toughness', description: 'Develop resilience mindset', duration: '8 min' }
      ]
    }
  ];

  const todaysActivities = [
    { id: 'strength1', type: 'strength', title: 'Morning Push-ups', description: '2 sets of 10-15 reps', duration: '3 min' },
    { id: 'mental1', type: 'mental', title: 'Breathing Exercise', description: 'Box breathing technique', duration: '5 min' },
    { id: 'mobility1', type: 'mobility', title: 'Hip & Shoulder Mobility', description: 'Essential daily movement', duration: '4 min' },
    { id: 'nature1', type: 'nature', title: 'Nature Walk', description: '15-minute walk in green space', duration: '15 min' }
  ];

  const completeActivity = (activityId, type, title) => {
    if (!todayCompleted.has(activityId)) {
      setTodayCompleted(prev => new Set([...prev, activityId]));
      
      const nextEmptyIndex = chain.findIndex(link => link.isEmpty);
      if (nextEmptyIndex !== -1) {
        const updatedChain = [...chain];
        updatedChain[nextEmptyIndex] = {
          id: updatedChain[nextEmptyIndex].id,
          type: type,
          date: new Date().toISOString().split('T')[0],
          activity: title,
          isEmpty: false
        };
        setChain(updatedChain);
      }
    }
  };

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

      <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 3l14 9-9 14-5-13z" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-lg">Nature Connect</h4>
            <p className="text-sm opacity-90">Discover trails, find hiking buddies</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-xl font-bold">23</div>
            <div className="text-xs opacity-90">Local Trails</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-xl font-bold">8</div>
            <div className="text-xs opacity-90">This Weekend</div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="bg-white/20 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Dandenong Ranges Circuit</p>
                <p className="text-xs opacity-90">Moderate • 8.2km • 2h 30min</p>
              </div>
              <span className="text-xs bg-white/30 px-2 py-1 rounded">3 going</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button className="bg-white text-emerald-600 px-3 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors">
            Find Trails
          </button>
          <button className="border border-white text-white px-3 py-2 rounded-lg font-medium text-sm hover:bg-white hover:text-emerald-600 transition-colors">
            Join Hike
          </button>
        </div>
      </div>
    </div>
  );

  const MoreView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">More</h2>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Your Plan</h3>
          <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
            {user.plan === 'free' ? 'Free Plan' : 'Premium Plan'}
          </span>
        </div>
        {user.plan === 'free' ? (
          <div>
            <p className="text-gray-600 mb-4">Upgrade to unlock advanced features and personal coaching</p>
            <button 
              onClick={() => setShowPayment(true)}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-colors font-medium w-full"
            >
              Upgrade to Premium
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-2">You have access to all premium features</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-800 font-medium">Premium Member</p>
              <p className="text-green-600 text-sm">Enjoying unlimited access to all programs</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-26 bg-black rounded-lg flex-shrink-0 overflow-hidden shadow-lg">
            <div className="w-full h-full bg-gradient-to-b from-gray-800 to-black flex flex-col justify-between p-2 text-center">
              <div>
                <div className="text-white text-xs font-bold leading-tight">LIVING</div>
                <div className="text-orange-400 text-sm font-bold leading-none">40FIED</div>
              </div>
              <div className="text-white text-xs">TAMAS</div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">Living 40FIED</h3>
            <p className="text-sm opacity-90 mb-3">Stories of Practical Wisdom</p>
            <button className="bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Get the Book - $24.99
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-medium">40FIED YouTube Channel</h4>
              <p className="text-sm text-gray-600">Free workout tutorials and wisdom</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        
