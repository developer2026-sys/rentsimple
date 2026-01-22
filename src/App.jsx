import { useEffect, useState } from 'react';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from './baseUrl';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import LocationSuggestionField from './components/locationsuggestionfield';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import PaymentFormSignup from './components/Paymentform';

import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51OwuO4LcfLzcwwOYdssgGfUSfOgWT1LwO6ewi3CEPewY7WEL9ATqH6WJm3oAcLDA3IgUvVYLVEBMIEu0d8fUwhlw009JwzEYmV');



export default function App() {
  const [activeTab, setActiveTab] = useState('signup');
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [showAuthButtons, setShowAuthButtons] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    deliveryAddress: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stripeElementsRef, setStripeElementsRef] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    check();
  }, []);

  const check = () => {
    const params = new URLSearchParams(location.search);
    const login = params.get('login');
    if (login) {
      setActiveTab('login');
      setShowAuthForm(true);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLocationChange = (locationData) => {
    setFormData({
      ...formData,
      deliveryAddress: typeof locationData === 'string' ? locationData : locationData.name
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (formData.name.length === 0 && activeTab !== "login") {
        toast.error("Please enter your name");
        return;
      } else if (formData.email.length === 0) {
        toast.error("Please enter your email");
        return;
      } else if(formData.deliveryAddress.length === 0 && activeTab !== "login") {
        toast.error("Please enter your delivery address");
        return;
      } else if (formData.mobile.length === 0 && activeTab !== "login") {
        toast.error("Please enter your mobile number");
        return;
      } else if (formData.password.length === 0) {
        toast.error("Please enter your password");
        return;
      }
  
      if (activeTab === "login") {
        setIsSubmitting(true);
        const response = await axios.post(`${BASE_URL}/login`, formData);
        console.log(response.data);
        
        toast.success("User logged in successfully", { autoClose: 1500 });
        
        localStorage.setItem("token", response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.removeItem('cartItems');
        
        setTimeout(() => {
          navigate('/appliance');
        }, 1500);
      } else {
        setIsSubmitting(true);
        let paymentMethodId = null;
        
        console.log('Starting signup process...');
        console.log('Stripe ref available:', !!stripeElementsRef);
        
        if (stripeElementsRef?.stripe && stripeElementsRef?.elements) {
          console.log('Stripe elements found, attempting to process card...');
          const cardNumberElement = stripeElementsRef.elements.getElement(CardNumberElement);
          
          if (cardNumberElement) {
            try {
              console.log('Creating payment method...');
              const { error, paymentMethod } = await stripeElementsRef.stripe.createPaymentMethod({
                type: 'card',
                card: cardNumberElement,
              });
              
              console.log('Stripe response - error:', error, 'paymentMethod:', paymentMethod);
              
              if (error) {
                if (error.code === 'incomplete_number' || 
                    error.code === 'incomplete_expiry' || 
                    error.code === 'incomplete_cvc') {
                  console.log('Card fields incomplete/empty - OK, continuing without payment');
                } else {
                  console.log('Real card error:', error.message);
                  setIsSubmitting(false);
                  toast.error(error.message || 'Invalid payment information. Please check your card details or leave fields empty to skip.');
                  return;
                }
              } else if (paymentMethod) {
                paymentMethodId = paymentMethod.id;
                console.log('✓ Payment method created successfully:', paymentMethodId);
              }
            } catch (err) {
              console.error('Exception while creating payment method:', err);
              setIsSubmitting(false);
              toast.error('Error processing payment. Please try again or leave fields empty to skip.');
              return;
            }
          } else {
            console.log('No card element found');
          }
        } else {
          console.log('Stripe not initialized');
        }

        console.log('Calling register API with paymentMethodId:', paymentMethodId);
        const response = await axios.post(`${BASE_URL}/register`, {
          ...formData,
          ...(paymentMethodId && { paymentMethodId })
        });
        
        console.log('Registration successful:', response.data);
        
        toast.success("Account created successfully!", { autoClose: 1500 });
        
        localStorage.setItem("token", response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.removeItem('cartItems');
        
        console.log('Navigating to /appliance...');
        setTimeout(() => {
          navigate('/appliance');
        }, 1500);
      }
      
    } catch (e) {
      console.log(e);
      console.log("ERROR FROM API");
      if (e?.response?.data?.error) {
        toast.error(e?.response?.data?.error);
      } else {
        toast.error("Error while authenticating please try again");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkipPayment = async () => {
    try {
      setIsSubmitting(true);
      
      const response = await axios.post(`${BASE_URL}/register`, formData);
      
      toast.success("Account created successfully!", { autoClose: 1500 });
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.removeItem('cartItems');
      
      setTimeout(() => {
        navigate('/appliance');
      }, 1500);
      
    } catch (e) {
      console.log(e);
      if (e?.response?.data?.error) {
        toast.error(e?.response?.data?.error);
      } else {
        toast.error("Error while creating account");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWantToRent = () => {
    setShowAuthButtons(true);
  };

  const handleVendor = () => {
    navigate('/vendorlogin');
  };

  const handleAuthButtonClick = (tab) => {
    setActiveTab(tab);
    setShowAuthForm(true);
  };

  const handleBack = () => {
    if (showAuthForm) {
      setShowAuthForm(false);
    } else {
      setShowAuthButtons(false);
    }
  };

  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      {showAuthForm ? (
        <Elements stripe={stripePromise}>
          <div className="min-h-screen bg-[#f3f4e6] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white rounded-lg shadow-lg overflow-hidden mx-auto">
              
              <div className="bg-white px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6 text-center">
                <div className="mb-3 sm:mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-[#024a47] rounded-lg mb-2">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white" fill="currentColor">
                      <path d="M19 9.3V4h-3v2.6L12 3L2 12h3v8h6v-6h2v6h6v-8h3L19 9.3z"/>
                      <circle cx="8" cy="16" r="1"/>
                      <circle cx="16" cy="16" r="1"/>
                      <rect x="6" y="14" width="4" height="1"/>
                      <rect x="14" y="14" width="4" height="1"/>
                    </svg>
                  </div>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#024a47] mb-1">RentSimple</h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#024a47]">Rent-to-Own Appliance</p>
              </div>

              <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#024a47] text-center">
                  Create Account / Log In
                </h2>
              </div>

              <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6">
                <div className="bg-[#024a47] rounded-lg p-1 flex">
                  <button
                    onClick={() => setActiveTab('signup')}
                    className={`flex-1 cursor-pointer py-3 px-4 rounded-md font-semibold transition-all ${
                      activeTab === 'signup' 
                        ? 'bg-white text-[#024a47]' 
                        : 'bg-[#024a47] text-white hover:bg-[#035d59]'
                    }`}
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => setActiveTab('login')}
                    className={`flex-1 cursor-pointer py-3 px-4 rounded-md font-semibold transition-all ${
                      activeTab === 'login' 
                        ? 'bg-white text-[#024a47]' 
                        : 'bg-[#024a47] text-white hover:bg-[#035d59]'
                    }`}
                  >
                    Log In
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="flex-grow h-px bg-gray-300"></div>
                  <span className="px-3 sm:px-4 text-base sm:text-lg lg:text-xl font-semibold text-[#024a47]">
                    {activeTab === "login" ? "Log In" : "Sign Up"}
                  </span>
                  <div className="flex-grow h-px bg-gray-300"></div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {activeTab !== "login" && (
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-3 sm:py-4 text-gray-700 placeholder-gray-400 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024a47] text-base sm:text-lg"
                      />
                    </div>
                  )}

                  {activeTab !== "login" && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Delivery Address
                      </label>
                      <LocationSuggestionField
                        title="Delivery address"
                        value={formData.deliveryAddress}
                        onChange={handleLocationChange}
                        name="deliveryAddress"
                        required={true}
                      />
                    </div>
                  )}

                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 text-gray-700 placeholder-gray-400 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024a47] text-base sm:text-lg"
                    />
                  </div>

                  {activeTab !== "login" && (
                    <div>
                      <input
                        type="tel"
                        name="mobile"
                        placeholder="Mobile Number"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-3 sm:py-4 text-gray-700 placeholder-gray-400 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024a47] text-base sm:text-lg"
                      />
                    </div>
                  )}

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 pr-12 text-gray-700 placeholder-gray-400 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#024a47] text-base sm:text-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#024a47] transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* {activeTab === "signup" && (
                    <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
                      <h3 className="text-sm font-semibold text-[#024a47] mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        Payment Method (Optional)
                      </h3>
                      <p className="text-xs text-gray-600 mb-3">
                        Add your payment method now or skip and add it later
                      </p>
                      <PaymentFormSignup 
                        onStripeReady={setStripeElementsRef}
                        isProcessing={isSubmitting}
                        inline={true}
                      />
                    </div>
                  )} */}

                  <div className="pt-3 sm:pt-4 pb-6 sm:pb-8">
                    <div className="flex flex-row items-center justify-between mb-4">
                      <p 
                        onClick={() => navigate('/reset-password')}
                        className="cursor-pointer underline text-[#024a47] hover:text-[#035d59] text-sm sm:text-base"
                      >
                        Reset Password
                      </p>
                      <p 
                        onClick={() => navigate('/contact')}
                        className="cursor-pointer underline text-[#024a47] hover:text-[#035d59] text-sm sm:text-base"
                      >
                        Support
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full cursor-pointer bg-[#024a47] hover:bg-[#035d59] text-white font-semibold py-3 sm:py-4 px-4 rounded-lg transition-colors text-base sm:text-lg lg:text-xl mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Processing...
                        </span>
                      ) : (
                        activeTab === "login" ? "Log In" : "Sign Up"
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={isSubmitting}
                      className="w-full cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors text-base disabled:opacity-50"
                    >
                      ← Back
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Elements>
      ) : (
        <div className="min-h-screen bg-[#f3f4e6] flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md space-y-6">
        
            <div className="text-center mb-12">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#024a47] rounded-2xl mx-auto">
                  <svg viewBox="0 0 24 24" className="w-12 h-12 text-white" fill="currentColor">
                    <path d="M19 9.3V4h-3v2.6L12 3L2 12h3v8h6v-6h2v6h6v-8h3L19 9.3z"/>
                    <circle cx="8" cy="16" r="1"/>
                    <circle cx="16" cy="16" r="1"/>
                    <rect x="6" y="14" width="4" height="1"/>
                    <rect x="14" y="14" width="4" height="1"/>
                  </svg>
                </div>
              </div>
              <h1 className="text-5xl font-bold text-[#024a47]">RentSimple</h1>
              <p className="text-xl text-[#024a47] mt-2">Rent-to-Own Appliance</p>
            </div>

            <div className="space-y-4">
              {!showAuthButtons ? (
                <>
                  <button
                    onClick={handleWantToRent}
                    className="w-full bg-white hover:bg-gray-50 text-[#024a47] text-2xl font-semibold py-6 px-6 rounded-2xl border-3 border-[#024a47] transition-all shadow-md hover:shadow-lg"
                  >
                    I Want to Rent
                  </button>

                  <button
                    onClick={handleVendor}
                    className="w-full bg-white hover:bg-gray-50 text-[#024a47] text-2xl font-semibold py-6 px-6 rounded-2xl border-3 border-[#024a47] transition-all shadow-md hover:shadow-lg"
                  >
                    I'm a Vendor
                  </button>
                </>
              ) : (
                <>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleAuthButtonClick('signup')}
                      className="flex-1 bg-white hover:bg-gray-50 text-[#024a47] text-xl font-semibold py-5 px-6 rounded-2xl border-3 border-[#024a47] transition-all shadow-md hover:shadow-lg"
                    >
                      Sign Up
                    </button>
                    <button
                      onClick={() => handleAuthButtonClick('login')}
                      className="flex-1 bg-white hover:bg-gray-50 text-[#024a47] text-xl font-semibold py-5 px-6 rounded-2xl border-3 border-[#024a47] transition-all shadow-md hover:shadow-lg"
                    >
                      Log In
                    </button>
                  </div>
                  
                  <button
                    onClick={handleBack}
                    className="w-full cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors text-base"
                  >
                    ← Back
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}