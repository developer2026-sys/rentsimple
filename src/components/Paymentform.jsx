import React from 'react';
import { toast } from 'react-toastify';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState,useEffect } from 'react';
function PaymentFormSignup({ onStripeReady, isProcessing, inline = false }) {
    const stripe = useStripe();
    const elements = useElements();
  // In PaymentFormSignup component
const [hasCardInput, setHasCardInput] = useState(false);

useEffect(() => {
  if (stripe && elements) {
    const cardElement = elements.getElement(CardNumberElement);
    
    if (cardElement) {
      cardElement.on('change', (event) => {
        // Track if user has started entering card data
        if (event.complete || !event.empty) {
          setHasCardInput(true);
        } else if (event.empty) {
          setHasCardInput(false);
        }
      });
    }
    
    // Pass stripe, elements, AND hasCardInput flag to parent
    onStripeReady({ stripe, elements, hasCardInput });
  }
}, [stripe, elements, hasCardInput]);
    // Send stripe and elements reference to parent
    React.useEffect(() => {
      if (stripe && elements && onStripeReady) {
        onStripeReady({ stripe, elements });
      }
    }, [stripe, elements, onStripeReady]);
  const elementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#1f2937',
        '::placeholder': {
          color: '#9ca3af',
        },
      },
    },
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!stripe || !elements) {
      toast.error('Stripe is not loaded yet', { containerId: inline ? "appPageauthform" : "appPage" });
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    if (!cardElement) {
      toast.error('Please enter your card details', { containerId: inline ? "appPageauthform" : "appPage" });
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      toast.error(error.message, { containerId: inline ? "appPageauthform" : "appPage" });
      return;
    }

    if (paymentMethod) {
      onPaymentMethodCreated(paymentMethod);
    } else {
      toast.error('Please enter valid card details', { containerId: inline ? "appPageauthform" : "appPage" });
    }
  };

  return (
    <div className="space-y-3">
      {/* Card Number */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Card Number
        </label>
        <div className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-[#024a47] bg-white">
          <CardNumberElement options={elementOptions} />
        </div>
      </div>

      {/* Expiry Date and CVC */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Expiry Date
          </label>
          <div className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-[#024a47] bg-white">
            <CardExpiryElement options={elementOptions} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            CVC
          </label>
          <div className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-[#024a47] bg-white">
            <CardCvcElement options={elementOptions} />
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5">
        <div className="flex items-start space-x-2">
          <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p className="text-xs text-blue-800">
            Your payment information is encrypted and secure.
          </p>
        </div>
      </div>

      {/* Action Buttons - Only show when not inline */}
      {!inline && (
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={handleSubmit}
            disabled={isProcessing || !stripe}
            type="button"
            className="flex-1 flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 bg-[#024a47] hover:bg-[#035d59] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-semibold"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                <span>Processing...</span>
              </>
            ) : (
              <span>Complete Signup</span>
            )}
          </button>
          {onSkip && (
            <button
              onClick={onSkip}
              disabled={isProcessing}
              type="button"
              className="px-4 sm:px-6 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base font-semibold"
            >
              Skip for Now
            </button>
          )}
        </div>
      )}

  
    </div>
  );
}

export default PaymentFormSignup;