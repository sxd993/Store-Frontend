import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useCallback } from 'react';

export const useReCaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const executeReCaptcha = useCallback(async (action = 'login') => {
    if (!executeRecaptcha) {
      console.warn('Execute recaptcha not yet available');
      return null;
    }

    try {
      const token = await executeRecaptcha(action);
      return token;
    } catch (error) {
      console.error('reCAPTCHA error:', error);
      return null;
    }
  }, [executeRecaptcha]);

  return {
    executeReCaptcha,
    isReady: !!executeRecaptcha
  };
};