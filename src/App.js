import React, { useState, useEffect, memo } from 'react';
import { Calendar, Plus, Check, User, Home, Users, Youtube, Facebook, BookOpen, Dumbbell, Eye, UserPlus, MapPin, Clock } from 'lucide-react';

// Separate memoized components for forms
const EmailForm = memo(({ onSubmit }) => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = () => {
    onSubmit(email);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to 40FIED</h2>
        <p className="text-gray-600">Enter your email to start your 40-day journey</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          placeholder="your.email@example.com"
          autoComplete="email"
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={!email || !email.includes('@')}
        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-colors font-medium disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
});

const NameForm = memo(({ email, onSubmit, onBack }) => {
  const [name, setName] = useState('');
  
  const handleSubmit = () => {
    onSubmit(name);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h2>
        <p className="text-gray-600">You're new here! Let's get you set up.</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input 
          type="email" 
          value={email} 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50" 
          disabled 
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          placeholder="Enter your first name"
          autoComplete="given-name"
        />
      </div>
      <div className="flex space-x-3">
        <button 
          onClick={onBack} 
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!name.trim()}
          className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-colors font-medium disabled:opacity-50"
        >
          Start Challenge
        </button>
      </div>
    </div>
  );
});

const BuddyForm = memo(({ userName, currentDay, onSubmit, onCancel, editingPost }) => {
  const [formData, setFormData] = useState({
    location: editingPost?.location || '',
    experience: editingPost?.experience || '',
    goals: editingPost?.goals || '',
    contact: editingPost?.contact || ''
  });

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      name: editingPost?.name || userName,
      day: editingPost?.day || currentDay
    });
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isValid = formData.location && formData.experience && formData.goals && formData.contact;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {editingPost ? 'Edit Post' : 'Find Training Buddy'}
        </h2>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">✕</button>
      </div>
      
      {editingPost && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Editing post by:</strong> {editingPost.name} (Day {editingPost.day})
          </p>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => updateField('location', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder="e.g. Melbourne, VIC"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
          <select
            value={formData.experience}
            onChange={(e) => updateField('experience', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select experience level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Goals</label>
          <textarea
            value={formData.goals}
            onChange={(e) => updateField('goals', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder="What are you hoping to achieve?"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Info</label>
          <input
            type="text"
            value={formData.contact}
            onChange={(e) => updateField('contact', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            placeholder="Email or phone number"
          />
        </div>
      </div>
      <div className="flex space-x-3 mt-6">
        <button
          onClick={onCancel}
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-colors font-medium disabled:opacity-50"
        >
          {editingPost ? 'Update Post' : 'Post to Board'}
        </button>
      </div>
    </div>
  );
});

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [chain, setChain] = useState([]);
  const [todayCompleted, setTodayCompleted] = useState(new Set());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginStep, setLoginStep] = useState('email');
  const [loginEmail, setLoginEmail] = useState('');
  const [showBuddyForm, setShowBuddyForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [buddyPosts, setBuddyPosts] = useState([]);
  const [celebrations, setCelebrations] = useState([]);
  const [user, setUser] = useState({
    name: '',
    email: '',
    streak: 0,
    currentDay: 1,
    joinDate: null
  });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('fortified_user') || '{}');
    if (savedUser.email) {
      setUser(savedUser);
      setIsLoggedIn(true);
      setIsAdmin(savedUser.email === 'coach@40fied.com' || savedUser.email === 'admin@40fied.com');
      loadUserData(savedUser.email);
    }
    loadBuddyPosts();
    loadCelebrations();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setShowLogin(true);
    }
  }, [isLoggedIn]);

  const loadCelebrations = () => {
    const savedCelebrations = localStorage.getItem('celebrations');
    if (savedCelebrations) {
      setCelebrations(JSON.parse(savedCelebrations));
    } else {
      setCelebrations([]);
    }
  };

  const addCelebration = (type, userName) => {
    const newCelebration = {
      id: Date.now(),
      type: type,
      userName: userName,
      date: new Date().toISOString(),
      isNew: true
    };
    
    const updatedCelebrations = [newCelebration, ...celebrations];
    setCelebrations(updatedCelebrations);
    localStorage.setItem('celebrations', JSON.stringify(updatedCelebrations));
  };

  const loadBuddyPosts = () => {
    const savedPosts = localStorage.getItem('buddy_posts');
    if (savedPosts) {
      const posts = JSON.parse(savedPosts);
      const hasFakePosts = posts.some(post => 
        post.contact === 'mike.t@email.com' || 
        post.contact === 'dave.runner@email.com' || 
        post.contact === 'jkennedy@email.com'
      );
      
      if (hasFakePosts) {
        const realPosts = posts.filter(post => 
          post.contact !== 'mike.t@email.com' && 
          post.contact !== 'dave.runner@email.com' && 
          post.contact !== 'jkennedy@email.com'
        );
        setBuddyPosts(realPosts);
        localStorage.setItem('buddy_posts', JSON.stringify(realPosts));
      } else {
        setBuddyPosts(posts);
      }
    } else {
      setBuddyPosts([]);
      localStorage.setItem('buddy_posts', JSON.stringify([]));
    }
  };

  const loadUserData = (email) => {
    const savedChain = localStorage.getItem(`fortified_chain_${email}`);
    if (savedChain) {
      setChain(JSON.parse(savedChain));
    } else {
      initializeChain();
    }
  };

  const initializeChain = () => {
    const emptyChain = Array.from({ length: 40 }, (_, index) => ({
      id: index + 1,
      type: 'empty',
      date: null,
      activity: `Day ${index + 1}`,
      isEmpty: true
    }));
    setChain(emptyChain);
  };

  const handleEmailSubmit = (email) => {
    setLoginEmail(email);
    const existingUser = localStorage.getItem(`user_profile_${email}`);
    if (existingUser) {
      const userData = JSON.parse(existingUser);
      setUser(userData);
      setIsLoggedIn(true);
      setShowLogin(false);
      loadUserData(email);
    } else {
      setLoginStep('register');
    }
  };

  const handleNameSubmit = (name) => {
    const newUser = {
      name: name,
      email: loginEmail,
      streak: 0,
      currentDay: 1,
      joinDate: new Date().toISOString()
    };
    
    const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
    allUsers.push({
      ...newUser,
      registrationDate: new Date().toISOString(),
      isNew: true
    });
    localStorage.setItem('all_users', JSON.stringify(allUsers));
    
    setUser(newUser);
    setIsAdmin(loginEmail === 'coach@40fied.com' || loginEmail === 'admin@40fied.com');
    localStorage.setItem('fortified_user', JSON.stringify(newUser));
    localStorage.setItem(`user_profile_${loginEmail}`, JSON.stringify(newUser));
    setIsLoggedIn(true);
    setLoginStep('welcome');
    initializeChain();
    setTimeout(() => {
      setShowLogin(false);
      setLoginStep('email');
    }, 3000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUser({ name: '', email: '', streak: 0, currentDay: 1, joinDate: null });
    setChain([]);
    setTodayCompleted(new Set());
    setLoginEmail('');
    localStorage.removeItem('fortified_user');
    setShowLogin(true);
  };

  const handleBuddyPost = (postData) => {
    if (editingPost) {
      const updatedPosts = buddyPosts.map(post => 
        post.id === editingPost.id 
          ? { ...editingPost, ...postData, date: new Date().toISOString().split('T')[0] }
          : post
      );
      setBuddyPosts(updatedPosts);
      localStorage.setItem('buddy_posts', JSON.stringify(updatedPosts));
      setEditingPost(null);
    } else {
      const newPost = {
        id: Date.now(),
        name: postData.name,
        location: postData.location,
        experience: postData.experience,
        goals: postData.goals,
        contact: postData.contact,
        date: new Date().toISOString().split('T')[0],
        day: postData.day
      };
      const updatedPosts = [newPost, ...buddyPosts];
      setBuddyPosts(updatedPosts);
      localStorage.setItem('buddy_posts', JSON.stringify(updatedPosts));
    }
    setShowBuddyForm(false);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setShowBuddyForm(true);
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = buddyPosts.filter(post => post.id !== postId);
      setBuddyPosts(updatedPosts);
      localStorage.setItem('buddy_posts', JSON.stringify(updatedPosts));
    }
  };

  const markUserAsViewed = (userEmail) => {
    const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
    const updatedUsers = allUsers.map(user => 
      user.email === userEmail ? { ...user, isNew: false } : user
    );
    localStorage.setItem('all_users', JSON.stringify(updatedUsers));
  };

  const getNewUsersCount = () => {
    const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
    return allUsers.filter(user => user.isNew).length;
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
        localStorage.setItem(`fortified_chain_${user.email}`, JSON.stringify(updatedChain));
        
        const newCurrentDay = user.currentDay + 1;
        const newStreak = user.streak + 1;
        
        if (newStreak === 20) {
          addCelebration('20day', user.name);
        } else if (newStreak === 40) {
          addCelebration('40day', user.name);
        }
        
        const updatedUser = { ...user, currentDay: newCurrentDay, streak: newStreak };
        setUser(updatedUser);
        localStorage.setItem('fortified_user', JSON.stringify(updatedUser));
      }
    }
  };

  const activityTypes = {
    completed: { color: 'bg-green-500', icon: Check },
    missed: { color: 'bg-red-500', icon: Eye },
    empty: { color: 'bg-gray-200 border-2 border-gray-300 border-dashed', icon: Plus }
  };

  const AdminPanel = () => {
    if (!showAdminPanel) return null;

    const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
    const newUsers = allUsers.filter(user => user.isNew);
    const allUsersCount = allUsers.length;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
              <button
                onClick={() => setShowAdminPanel(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">{allUsersCount}</div>
                <div className="text-sm text-blue-700">Total Users</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <div className="text-2xl font-bold text-orange-600">{newUsers.length}</div>
                <div className="text-sm text-orange-700">New Signups</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="text-2xl font-bold text-green-600">{buddyPosts.length}</div>
                <div className="text-sm text-green-700">Buddy Posts</div>
              </div>
            </div>

            {newUsers.length > 0 ? (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-red-600">🔔 New User Registrations</h3>
                <div className="space-y-3">
                  {newUsers.map((user, index) => (
                    <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">
                            Registered: {new Date(user.registrationDate).toLocaleDateString()} at {new Date(user.registrationDate).toLocaleTimeString()}
                          </p>
                          <p className="text-xs text-gray-500">Currently on Day {user.currentDay}</p>
                        </div>
                        <button
                          onClick={() => markUserAsViewed(user.email)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                        >
                          Mark as Viewed
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-600">No new user registrations</p>
                <p className="text-gray-500 text-sm">You're all caught up!</p>
              </div>
            )}

            {allUsers.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">All Users</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {allUsers.slice().reverse().map((user, index) => (
                    <div key={index} className={`border rounded-lg p-3 ${user.isNew ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">{user.name}</span>
                          <span className="text-sm text-gray-600 ml-2">({user.email})</span>
                          {user.isNew && <span className="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded">NEW</span>}
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(user.registrationDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const LoginSystem = () => {
    if (!showLogin) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full p-6">
          {loginStep === 'email' && (
            <EmailForm onSubmit={handleEmailSubmit} />
          )}
          {loginStep === 'register' && (
            <NameForm 
              email={loginEmail}
              onSubmit={handleNameSubmit}
              onBack={() => setLoginStep('email')}
            />
          )}
          {loginStep === 'welcome' && (
            <div className="text-center space-y-6 py-8">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome aboard, {user.name}!</h3>
                <p className="text-gray-600">Your 40-day transformation journey starts now.</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <p className="text-orange-800 font-medium mb-1">Ready to build lasting change?</p>
                <p className="text-orange-700 text-sm">Complete your first workout to start building your chain!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const BuddyFormModal = () => {
    if (!showBuddyForm) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <BuddyForm
            userName={user.name}
            currentDay={user.currentDay}
            editingPost={editingPost}
            onSubmit={handleBuddyPost}
            onCancel={() => {
              setShowBuddyForm(false);
              setEditingPost(null);
            }}
          />
        </div>
      </div>
    );
  };

  const HomeView = () => {
    const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
    const totalUsers = allUsers.length;
    const recentCelebrations = celebrations.slice(0, 3);
    
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 rounded-xl p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
            <p className="opacity-90">40 workouts in 40 days - build your strength and resilience</p>
            {totalUsers > 1 && (
              <div className="mt-3 bg-white/20 rounded-lg px-3 py-2 inline-block">
                <p className="text-sm font-medium">💪 Join {totalUsers} members crushing their goals!</p>
              </div>
            )}
          </div>
        </div>

        {recentCelebrations.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900">🎉 Community Celebrations</h3>
            {recentCelebrations.map((celebration) => (
              <div 
                key={celebration.id} 
                className={`rounded-xl p-4 text-white border-2 shadow-lg ${
                  celebration.type === '40day' 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 border-yellow-300' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 border-blue-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">
                    {celebration.type === '40day' ? '🏆' : '🔥'}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">
                      {celebration.type === '40day' 
                        ? `${celebration.userName} completed the 40FIED Challenge!` 
                        : `${celebration.userName} hit the halfway mark!`
                      }
                    </h4>
                    <p className="text-sm opacity-90">
                      {celebration.type === '40day' 
                        ? '40 days of dedication - CHAMPION! 🏆' 
                        : '20 workouts down, 20 to go! 💪'
                      }
                    </p>
                    <p className="text-xs opacity-75 mt-1">
                      {new Date(celebration.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent"></div>
          <div className="relative">
            <h3 className="text-white text-xl font-bold mb-2">40FIED Challenge - Don't Break the Chain!</h3>
            <p className="text-gray-300 text-sm mb-6">Complete 40 workouts in 40 days</p>
            
            <div className="grid grid-cols-10 gap-1.5 mb-6">
              {chain.map((link, index) => {
                const typeInfo = activityTypes[link.type];
                const isEmpty = link.isEmpty;
                const IconComponent = typeInfo.icon;
                
                return (
                  <div key={link.id} className="relative group">
                    <div className={`w-8 h-8 ${typeInfo.color} rounded-lg flex items-center justify-center transform hover:scale-110 transition-all duration-200 ${!isEmpty ? 'shadow-lg' : ''}`}>
                      <IconComponent className={`w-3.5 h-3.5 ${isEmpty ? 'text-gray-400' : 'text-white'}`} />
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
  };

  const BuddyView = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Training Buddy</h2>
        
        {celebrations.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-lg mb-4">🏆 Hall of Fame</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {celebrations.map((celebration) => (
                <div key={celebration.id} className={`p-3 rounded-lg border-l-4 ${
                  celebration.type === '40day' 
                    ? 'bg-yellow-50 border-yellow-400' 
                    : 'bg-blue-50 border-blue-400'
                }`}>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {celebration.type === '40day' ? '🏆' : '🔥'}
                    </span>
                    <div>
                      <p className="font-bold text-gray-900">
                        {celebration.userName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {celebration.type === '40day' 
                          ? 'Completed the 40FIED Challenge!' 
                          : 'Reached Day 20 milestone!'
                        }
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(celebration.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-orange-800 text-sm font-medium">
                💪 If they can do it, so can you! Your name could be here next!
              </p>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-lg mb-4">Find Your Accountability Partner</h3>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
            <h4 className="font-bold text-lg mb-3">Connect with Other 40FIED Members</h4>
            <p className="text-gray-700 mb-4">Post to the buddy board or browse other members looking for training partners.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white/60 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">{buddyPosts.length}</div>
                <div className="text-xs text-gray-600">Active Posts</div>
              </div>
              <div className="bg-white/60 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-600">{buddyPosts.filter(post => post.day < 20).length}</div>
                <div className="text-xs text-gray-600">New Members</div>
              </div>
            </div>

            <button 
              onClick={() => setShowBuddyForm(true)}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-6 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-colors font-bold"
            >
              Post to Buddy Board
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-lg mb-4">Buddy Board</h3>
          
          {buddyPosts.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No posts yet. Be the first to find a buddy!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {buddyPosts.slice(0, 10).map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{post.name}</h4>
                        <div className="flex items-center text-sm text-gray-600 space-x-3">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {post.location}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            Day {post.day}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.experience === 'Beginner' ? 'bg-green-100 text-green-700' :
                      post.experience === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {post.experience}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-3 text-sm italic">"{post.goals}"</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Posted {new Date(post.date).toLocaleDateString()}</span>
                    <div className="flex items-center space-x-2">
                      {isAdmin && (
                        <>
                          <button 
                            onClick={() => handleEditPost(post)}
                            className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeletePost(post.id)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => window.open(`mailto:${post.contact}?subject=40FIED Training Buddy&body=Hi ${post.name}, I saw your post on the 40FIED buddy board and would love to connect!`, '_blank')}
                        className="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors"
                      >
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-lg mb-4">Success Stories</h3>
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-600 mb-2">Success stories will appear here</p>
            <p className="text-gray-500 text-sm">Real member achievements and testimonials from the 40FIED community</p>
          </div>
        </div>
      </div>
    );
  };

  const ConnectView = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Connect & Learn</h2>
       
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
            onClick={() => window.open('https://www.facebook.com/40fiedmenshealth', '_blank')}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Join Community →
          </button>
        </div>

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
            onClick={() => window.open('https://books.by/tamasfinta', '_blank')}
            className="bg-white text-orange-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Get the Book - $24.99 →
          </button>
        </div>
      </div>
    );
  };

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
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-8 h-8">
                  <circle cx="50" cy="50" r="50" fill="black"/>
                  <circle cx="50" cy="50" r="40" fill="white"/>
                  <text x="35" y="45" fill="black" fontSize="24" fontWeight="bold" fontFamily="Arial, sans-serif">4</text>
                  <text x="55" y="45" fill="black" fontSize="24" fontWeight="bold" fontFamily="Arial, sans-serif">F</text>
                  <text x="50" y="75" fill="black" fontSize="12" fontWeight="bold" fontFamily="Arial, sans-serif" textAnchor="middle">40FIED</text>
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">40FIED</h1>
              {isAdmin && (
                <button
                  onClick={() => setShowAdminPanel(true)}
                  className="relative bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                >
                  Admin
                  {getNewUsersCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                      {getNewUsersCount()}
                    </span>
                  )}
                </button>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {isLoggedIn && (
        <>
          <div className="max-w-md mx-auto px-4 py-6 pb-20">
            {renderCurrentView()}
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-around py-2">
                {[
                  { id: 'home', icon: Home, label: 'Chain' },
                  { id: 'buddy', icon: Users, label: 'Training Buddy' },
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
        </>
      )}

      <LoginSystem />
      <BuddyFormModal />
      <AdminPanel />
    </div>
  );
};

export default App;
