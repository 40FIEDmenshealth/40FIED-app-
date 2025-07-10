import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Check, User, Home, Users, Youtube, Facebook, BookOpen, Target, Dumbbell, Brain, Heart, Eye } from 'lucide-react';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [chain, setChain] = useState([]);
  const [todayCompleted, setTodayCompleted] = useState(new Set());
  const [user, setUser] = useState({
    name: 'User',
    streak: 12,
    currentDay: 1
  });

  // Load data from localStorage
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

  // Save data to localStorage
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

    // Sample progress for demo
    const sampleProgress = [
      { id: 1, type: 'completed', date: '2025-07-08', activity: 'Workout Complete', isEmpty: false },
      { id: 2, type: 'completed', date: '2025-07-09', activity: 'Workout Complete', isEmpty: false },
      { id: 3, type: 'missed', date: '2025-07-10', activity: 'Missed Day', isEmpty: false },
    ];

    const chainWithProgress = emptyChain.map((slot) => {
      const progress = sampleProgress.find(p => p.id === slot.id);
      return progress || slot;
    });

    setChain(chainWithProgress);
  };

  const activityTypes = {
    completed: { color: 'bg-green-500', icon: Check, label: 'Workout Complete' },
    missed: { color: 'bg-red-500', icon: Eye, label: 'Missed Day' },
    empty: { color: 'bg-gray-200 border-2 border-gray-300 border-dashed', icon: Plus, label: 'Day Pending' }
  };

  const completeWorkout = () => {
    if (!todayCompleted.has('today')) {
      setTodayCompleted(prev => new Set([...prev, 'today']));
      
      const nextEmptyIndex = chain.findIndex(link => link.isEmpty);
      if (nextEmptyIndex !== -1) {
        const updatedChain = [...chain];
        updatedChain[nextEmptyIndex] = {
          id: updatedChain[nextEmptyIndex].id,
          type: 'completed',
          date: new Date().toISOString().split('T')[0],
          activity: 'Workout Complete',
          isEmpty: false
        };
        setChain(updatedChain);
        setUser(prev => ({ ...prev, currentDay: prev.currentDay + 1, streak: prev.streak + 1 }));
      }
    }
  };

  const ChainVisualization = () => (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 mb-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent"></div>
      <div className="relative">
        <h3 className="text-white text-xl font-bold mb-2">40FIED Challenge - Don't Break the Chain!</h3>
        <p className="text-gray-300 text-sm mb-6">Complete 40 workouts in 40 days</p>
        
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
                  {isEmpty ? `Day ${index + 1}` : link.activity}
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
            Current Streak: <span className="text-green-400 font-bold text-lg">{user.streak}</span> days
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-orange-500">
          <p className="text-orange-300 text-sm font-medium">40 consecutive workouts builds lasting change.</p>
          <p className="text-gray-400 text-xs mt-1">Champions don't break the chain!</p>
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
          <p className="opacity-90">40 workouts in 40 days - build your strength and resilience</p>
        </div>
      </div>

      <ChainVisualization />

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-orange-600" />
          Today's Workout - Day {user.currentDay}
        </h3>
        
        <div className={`p-6 rounded-xl border-2 transition-all duration-200 ${
          todayCompleted.has('today') 
            ? 'bg-green-50 border-green-200 shadow-sm' 
            : 'bg-gray-50 border-gray-200 hover:border-orange-300 hover:shadow-md'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 ${todayCompleted.has('today') ? 'bg-green-500' : 'bg-orange-500'} rounded-xl flex items-center justify-center shadow-sm`}>
                <Dumbbell className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-900">Complete Today's Workout</h4>
                <p className="text-sm text-gray-600">Follow your 40FIED workout program</p>
                {todayCompleted.has('today') && (
                  <p className="text-sm text-green-600 font-medium mt-1">✅ Completed! Great work!</p>
                )}
              </div>
            </div>
            <button
              onClick={completeWorkout}
              className={`p-4 rounded-xl transition-all duration-200 ${
                todayCompleted.has('today') 
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/25' 
                  : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transform hover:scale-105'
              }`}
              disabled={todayCompleted.has('today')}
            >
              {todayCompleted.has('today') ? <Check className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const BuddyView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Training Buddy</h2>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-lg mb-4">Find Your Accountability Partner</h3>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
          <h4 className="font-bold text-lg mb-3">Get Matched with Someone Like You</h4>
          <p className="text-gray-700 mb-4">Connect with other men doing the 40FIED challenge. Share progress, stay motivated, and push each other to success.</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/60 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">47</div>
              <div className="text-xs text-gray-600">Active Members</div>
            </div>
            <div className="bg-white/60 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-xs text-gray-600">Looking for Partners</div>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-6 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-colors font-bold">
            Find My Training Buddy
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-lg mb-4">Success Stories</h3>
        <div className="space-y-4">
          {[
            { name: 'Dave M.', age: 45, story: 'My buddy kept me accountable through all 40 days. Lost 15 lbs!', streak: 40 },
            { name: 'Mark R.', age: 42, story: 'Having a training partner made all the difference. Crushed the challenge!', streak: 40 },
            { name: 'Tony L.', age: 48, story: 'We pushed each other every single day. Best decision I made.', streak: 40 }
          ].map((story, index) => (
            <div key={index} className="border-l-4 border-orange-500 pl-4 bg-orange-50/50 p-4 rounded-r-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-gray-900">{story.name}, {story.age}</span>
                <span className="text-sm text-orange-600 font-bold">✅ {story.streak} DAYS</span>
              </div>
              <p className="text-gray-700 italic">"{story.story}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ConnectView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Connect & Learn</h2>
      
      {/* YouTube Channel */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <Youtube className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">40FIED YouTube Channel</h3>
            <p className="text-sm opacity-90">Free workout videos and training tips</p>
          </div>
        </div>
        <p className="mb-4 opacity-95">Get access to all 40 workout videos, exercise tutorials, and expert coaching tips.</p>
        <button 
          onClick={() => window.open('https://youtube.com/@40fied', '_blank')}
          className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
        >
          Watch Workouts →
        </button>
      </div>

      {/* Facebook Community */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
            <Facebook className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">40FIED Community</h3>
            <p className="text-sm opacity-90">Join thousands of men on the journey</p>
          </div>
        </div>
        <p className="mb-4 opacity-95">Connect with other members, share your progress, and get motivation from the community.</p>
        <button 
          onClick={() => window.open('https://facebook.com/groups/40fied', '_blank')}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
        >
          Join Community →
        </button>
      </div>

      {/* Living 40FIED Book */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-black rounded-lg flex-shrink-0 overflow-hidden shadow-lg">
            <div className="w-full h-full bg-gradient-to-b from-gray-800 to-black flex flex-col justify-between p-2 text-center">
              <div>
                <div className="text-white text-xs font-bold leading-tight">LIVING</div>
                <div className="text-orange-400 text-sm font-bold leading-none">40FIED</div>
              </div>
              <div className="text-white text-xs">TAMAS</div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold">Living 40FIED</h3>
            <p className="text-sm opacity-90">Stories of Practical Wisdom</p>
          </div>
        </div>
        <p className="mb-4 opacity-95">The complete guide to building strength, resilience, and lasting change after 40.</p>
        <button 
          onClick={() => window.open('https://amazon.com/living-40fied', '_blank')}
          className="bg-white text-orange-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
        >
          Get the Book - $24.99 →
        </button>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch(currentView) {
      case 'buddy': return <BuddyView />;
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
              { id: 'home', icon: Home, label: 'Chain' },
              { id: 'buddy', icon: Users, label: 'Buddy' },
              { id: 'connect', icon: BookOpen, label: 'Connect' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id)}
                className={`flex flex-col items-center space-y-1 py-3 px-6 rounded-xl transition-all duration-200 ${
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
