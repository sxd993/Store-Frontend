import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CodeConfirmation = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Автоматический переход к следующему полю
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Переход назад при удалении
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split('');
      setCode([...newCode, ...Array(6 - newCode.length).fill('')]);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      setIsLoading(true);
      
      // Имитация проверки кода
      setTimeout(() => {
        setIsLoading(false);
        // Здесь будет реальная проверка кода
        console.log('Код подтверждения:', fullCode);
        
        // Если код верный, переходим на страницу изменения пароля
        navigate('/change-password', { 
          state: { 
            email: 'user@example.com', // Здесь будет реальный email
            code: fullCode 
          } 
        });
      }, 1500);
    }
  };

  const handleResendCode = () => {
    console.log('Отправка кода повторно');
    setIsResendDisabled(true);
    setCountdown(60); // 60 секунд до возможности повторной отправки
  };

  const isCodeComplete = code.every(digit => digit !== '');

  return (
    <div className="min-h-screen bg-white">
      {/* Кнопка назад */}
      <div className="w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link to="/forgot-password" className="text-gray-500 hover:text-gray-900 transition-colors duration-300">
            ← Назад к восстановлению пароля
          </Link>
        </div>
      </div>

      {/* Основной контент */}
      <div className="max-w-7xl mx-auto px-12 py-12 pb-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Левая колонка - Заголовок и описание */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">
                Подтверждение кода
              </h1>
              <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
                Введите 6-значный код, который мы отправили на ваш email для подтверждения.
              </p>
            </div>
            
            {/* Дополнительная информация */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                <span className="text-sm text-gray-600 font-light">Код действителен 10 минут</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                <span className="text-sm text-gray-600 font-light">Проверьте папку "Спам"</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                <span className="text-sm text-gray-600 font-light">Можно вставить код целиком</span>
              </div>
            </div>
          </div>

          {/* Правая колонка - Форма */}
          <div className="max-w-md mx-auto lg:mx-0">
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-6">Введите код подтверждения</h2>
              <p className="text-sm text-gray-600 mb-8">
                Код отправлен на <span className="font-medium">user@example.com</span>
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Поля для кода */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Код подтверждения
                  </label>
                  <div className="flex justify-between space-x-3">
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        ref={el => inputRefs.current[index] = el}
                        type="text"
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className="w-12 h-12 text-center text-lg font-medium border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors duration-300"
                        maxLength={1}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        disabled={isLoading}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isCodeComplete || isLoading}
                  className={`w-full px-8 py-3 font-medium transition-colors duration-300 ${
                    isCodeComplete && !isLoading
                      ? 'border-2 border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white'
                      : 'border-2 border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? 'Проверка кода...' : 'Подтвердить код'}
                </button>
              </form>

              {/* Повторная отправка кода */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 mb-3">
                  Не получили код?
                </p>
                <button
                  onClick={handleResendCode}
                  disabled={isResendDisabled || isLoading}
                  className={`text-sm transition-colors duration-300 ${
                    isResendDisabled || isLoading
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {isResendDisabled 
                    ? `Отправить повторно через ${countdown}с`
                    : 'Отправить код повторно'
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeConfirmation; 