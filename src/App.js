import React, { useState, useEffect } from 'react';
import { ChevronRight, Target, Users, BookOpen, Calendar, Plus, Check, User, Home, Dumbbell, Brain, Heart, Utensils, Eye, Youtube, Star } from 'lucide-react';

const FortifiedApp = () => {</div>
     </div>

     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
       <h3 className="font-semibold text-lg mb-4">Account Settings</h3>
       <div className="space-y-3">
         <div className="flex items-center justify-between py-2">
           <span className="text-gray-700">Profile Settings</span>
           <ChevronRight className="w-4 h-4 text-gray-400" />
         </div>
         <div className="flex items-center justify-between py-2">
           <span className="text-gray-700">Notifications</span>
           <ChevronRight className="w-4 h-4 text-gray-400" />
         </div>
         <div className="flex items-center justify-between py-2">
           <span className="text-gray-700">Privacy</span>
           <ChevronRight className="w-4 h-4 text-gray-400" />
         </div>
         <div className="flex items-center justify-between py-2">
           <span className="text-gray-700">Help & Support</span>
           <ChevronRight className="w-4 h-4 text-gray-400" />
         </div>
       </div>
     </div>
   </div>
 );

 const PaymentGateway = () => {
   if (!showPayment) return null;

   const PlansStep = () => (
     <div className="space-y-6">
       <div className="text-center">
         <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
         <p className="text-gray-600">Join thousands of men transforming their lives</p>
       </div>

       <div className="grid gap-4">
         {pricingPlans.map((plan) => (
           <div
             key={plan.id}
             onClick={() => setSelectedPlan(plan)}
             className={`relative bg-white rounded-xl p-6 border-2 cursor-pointer transition-all duration-200 ${
               selectedPlan?.id === plan.id
                 ? 'border-orange-500 shadow-lg shadow-orange-500/25'
                 : 'border-gray-200 hover:border-orange-300'
             } ${plan.popular ? 'ring-2 ring-orange-500 ring-opacity-50' : ''}`}
           >
             {plan.popular && (
               <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                 <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                   Most Popular
                 </span>
               </div>
             )}
             
             <div className="flex items-center justify-between mb-4">
               <div>
                 <h3 className="font-bold text-lg text-gray-900">{plan.name}</h3>
                 <p className="text-sm text-gray-600">{plan.description}</p>
               </div>
               <div className="text-right">
                 <div className="flex items-baseline">
                   <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                   <span className="text-gray-600 ml-1">/{plan.period}</span>
                 </div>
                 {plan.originalPrice && (
                   <div className="text-sm text-gray-500 line-through">${plan.originalPrice}/year</div>
                 )}
               </div>
             </div>

             <ul className="space-y-2">
               {plan.features.map((feature, index) => (
                 <li key={index} className="flex items-center text-sm text-gray-700">
                   <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                   {feature}
                 </li>
               ))}
             </ul>
           </div>
         ))}
       </div>

       <div className="flex space-x-3">
         <button
           onClick={() => setShowPayment(false)}
           className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
         >
           Cancel
         </button>
         <button
           onClick={() => selectedPlan && setPaymentStep('checkout')}
           disabled={!selectedPlan}
           className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
         >
           Continue
         </button>
       </div>
     </div>
   );

   const CheckoutStep = () => (
     <div className="space-y-6">
       <div className="flex items-center justify-between">
         <button
           onClick={() => setPaymentStep('plans')}
           className="text-orange-600 hover:text-orange-700 flex items-center"
         >
           <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
           Back to plans
         </button>
         <h2 className="text-xl font-bold text-gray-900">Checkout</h2>
         <div></div>
       </div>

       {selectedPlan && (
         <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
           <div className="flex justify-between items-center">
             <div>
               <h3 className="font-medium text-gray-900">{selectedPlan.name} Plan</h3>
               <p className="text-sm text-gray-600">{selectedPlan.description}</p>
             </div>
             <div className="text-right">
               <div className="text-2xl font-bold text-gray-900">${selectedPlan.price}</div>
               <div className="text-sm text-gray-600">per {selectedPlan.period}</div>
             </div>
           </div>
         </div>
       )}

       <div className="space-y-4">
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
           <input
             type="email"
             value={paymentData.email}
             onChange={(e) => setPaymentData(prev => ({ ...prev, email: e.target.value }))}
             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
             placeholder="your.email@example.com"
           />
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
           <input
             type="text"
             value={paymentData.name}
             onChange={(e) => setPaymentData(prev => ({ ...prev, name: e.target.value }))}
             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
             placeholder="John Smith"
           />
         </div>

         <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
           <input
             type="text"
             value={paymentData.cardNumber}
             onChange={(e) => setPaymentData(prev => ({ 
               ...prev, 
               cardNumber: formatCardNumber(e.target.value) 
             }))}
             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
             placeholder="1234 5678 9012 3456"
             maxLength={19}
           />
         </div>

         <div className="grid grid-cols-2 gap-4">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
             <input
               type="text"
               value={paymentData.expiryDate}
               onChange={(e) => setPaymentData(prev => ({ 
                 ...prev, 
                 expiryDate: formatExpiryDate(e.target.value) 
               }))}
               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
               placeholder="MM/YY"
               maxLength={5}
             />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
             <input
               type="text"
               value={paymentData.cvv}
               onChange={(e) => setPaymentData(prev => ({ 
                 ...prev, 
                 cvv: e.target.value.replace(/\D/g, '').slice(0, 4) 
               }))}
               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
               placeholder="123"
               maxLength={4}
             />
           </div>
         </div>
       </div>

       <div className="bg-gray-50 rounded-lg p-4">
         <div className="flex items-center text-sm text-gray-600 mb-2">
           <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
             <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
           </svg>
           Secure SSL encrypted payment
         </div>
         <p className="text-xs text-gray-500">Your payment information is encrypted and secure. Cancel anytime.</p>
       </div>

       <button
         onClick={handlePaymentSubmit}
         disabled={!paymentData.email || !paymentData.name || !paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv}
         className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-4 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
       >
         Complete Payment - ${selectedPlan?.price}
       </button>
     </div>
   );

   const ProcessingStep = () => (
     <div className="text-center space-y-6 py-12">
       <div className="w-16 h-16 mx-auto bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
         <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
       </div>
       <div>
         <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Payment</h3>
         <p className="text-gray-600">Please don't close this window...</p>
       </div>
     </div>
   );

   const SuccessStep = () => (
     <div className="text-center space-y-6 py-12">
       <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center">
         <Check className="w-8 h-8 text-white" />
       </div>
       <div>
         <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome to Premium!</h3>
         <p className="text-gray-600">Your account has been upgraded successfully.</p>
       </div>
       <div className="bg-green-50 rounded-lg p-4 border border-green-200">
         <p className="text-green-800 font-medium mb-1">What's next?</p>
         <p className="text-green-700 text-sm">You now have access to all premium programs and features!</p>
       </div>
     </div>
   );

   const renderStep = () => {
     switch (paymentStep) {
       case 'checkout': return <CheckoutStep />;
       case 'processing': return <ProcessingStep />;
       case 'success': return <SuccessStep />;
       default: return <PlansStep />;
     }
   };

   return (
     <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
       <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
         <div className="p-6">
           {renderStep()}
         </div>
       </div>
     </div>
   );
 };

 const renderCurrentView = () => {
   switch(currentView) {
     case 'train': return <TrainView />;
     case 'connect': return <ConnectView />;
     case 'more': return <MoreView />;
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
             {user.plan === 'premium' && (
               <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs px-2 py-1 rounded-full">
                 Premium
               </span>
             )}
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
             { id: 'connect', icon: Users, label: 'Connect' },
             { id: 'more', icon: Star, label: 'More' }
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

     <PaymentGateway />
   </div>
 );
};

export default FortifiedApp;
