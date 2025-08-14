import { useState, useCallback, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const HCAPTCHA_SITE_KEY = process.env.REACT_APP_HCAPTCHA_SITE_KEY || '10000000-ffff-ffff-ffff-000000000001';

export const HCaptchaWrapper = ({
  onVerify,
  onExpire,
  onError,
  theme = 'light',
  size = 'normal',
  className = '',
  disabled = false
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const captchaRef = useRef(null);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleError = useCallback((error) => {
    setIsLoading(false);
    setHasError(true);
    if (onError) onError(error);
  }, [onError]);

  const handleReset = useCallback(() => {
    if (captchaRef.current) {
      captchaRef.current.resetCaptcha();
      setHasError(false);
    }
  }, []);

  const handleExpire = useCallback(() => {
    if (onExpire) onExpire();
  }, [onExpire]);

  const handleVerify = useCallback((token) => {
    if (onVerify) onVerify(token);
  }, [onVerify]);

  if (!HCAPTCHA_SITE_KEY || HCAPTCHA_SITE_KEY === 'your_site_key_here') {
    return (
      <div className={`p-4 bg-yellow-50 border border-yellow-200 rounded ${className}`}>
        <p className="text-yellow-700 text-sm">
          ⚠️ hCaptcha не настроена. Добавьте REACT_APP_HCAPTCHA_SITE_KEY в .env
        </p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Индикатор загрузки */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
            <span className="text-sm text-gray-600">Загрузка защиты...</span>
          </div>
        </div>
      )}

      {/* Сообщение об ошибке */}
      {hasError && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded">
          <div className="flex items-center justify-between">
            <p className="text-red-700 text-sm">Ошибка загрузки защиты от ботов</p>
            <button
              type="button"
              onClick={handleReset}
              className="text-red-600 hover:text-red-800 text-sm underline"
            >
              Попробовать снова
            </button>
          </div>
        </div>
      )}

      {/* hCaptcha */}
      <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'} ${disabled ? 'pointer-events-none opacity-50' : ''}`}>
        <HCaptcha
          ref={captchaRef}
          sitekey={HCAPTCHA_SITE_KEY}
          onVerify={handleVerify}
          onExpire={handleExpire}
          onError={handleError}
          onLoad={handleLoad}
          theme={theme}
          size={size}
          tabindex={0}
        />
      </div>
    </div>
  );
};