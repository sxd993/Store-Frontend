import { useState } from 'react';
import { CartContainer } from '../features/commerce/components/CartContainer';
import { CheckoutContainer } from '../features/commerce/components/CheckoutContainer';

export const CartPage = () => {
  const [currentStep, setCurrentStep] = useState('cart');

  if (currentStep === 'checkout') {
    return <CheckoutContainer onBack={() => setCurrentStep('cart')} />;
  }

  return <CartContainer onCheckout={() => setCurrentStep('checkout')} />;
};