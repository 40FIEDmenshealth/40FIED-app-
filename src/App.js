import React, { useState } from 'react';
import { Calendar, Plus, Check, User, Home, Dumbbell, Users, Target, Brain, Heart, Utensils } from 'lucide-react';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [todayCompleted, setTodayCompleted] = useState(new Set());
const [chain, setChain] = useState([]);

// Load and save data
useEffect(() => {
  const savedChain = localStorage.getItem('fortified_chain');
  const savedCompleted = localStorage.getItem('fortified_completed');
  
  if (savedChain) {
    setChain(JSON.parse(savedChain));
  } else {
    initializeChain();
  }
  
  if (savedCompleted) {
    setTodayCompleted(new Set(JSON.parse(savedCompleted)));
  }
}, []);

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
  const [user] = useState({
    name: 'Marcus',
    streak: 12,
    plan: 'free'
  });

  const todaysActivities = [
    { id: 'strength1', type: 'strength', title: 'Morning Push-ups', description: '2 sets of 10-15 reps', duration: '3 min' },
    { id: 'mental1', type: 'mental', title: 'Breathing Exercise', description: 'Box breathing technique', duration: '5 min' },
    { id: 'mobility1', type: 'mobility', title: 'Hip & Shoulder Mobility', description: 'Essential daily movement', duration: '4 min' }
  ];

  const activityTypes = {
    strength: { color: 'bg-gray-500', icon: Dumbbell },
    mental: { color: 'bg-purple-500', icon: Brain },
    mobility: { color: 'bg-green-500', icon: Target }
  };

  const completeActivity = (activityId) => {
    setTodayCompleted(prev => new Set([...prev, activityId]));
  };

  const HomeView = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
        <p className="opacity-90">Build your strength and resilience one link at a time</p>
      </div>

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
                  onClick={() => completeActivity(activity.id)}
                  className={`p-3 rounded-xl transition-all duration-200 ${
                    isCompleted 
                      ? 'bg-green-500 text-white shadow-lg' 
                      : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg transform hover:scale-105'
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
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Training Programs</h2>
      <p className="text-gray-600">Training programs coming soon!</p>
    </div>
  );

  const ConnectView = () => (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Connect & Community</h2>
      <p className="text-gray-600">Community features coming soon!</p>
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
