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
