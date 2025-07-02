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
