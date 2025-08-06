const benefits = [
  'Быстрый доступ к заказам',
  'Персональные настройки', 
  'История покупок'
];

export const AuthInfo = ({ isLogin }) => (
  <div className="space-y-8">
    <div>
      <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">
        {isLogin ? 'Вход в аккаунт' : 'Регистрация'}
      </h1>
      <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
        {isLogin 
          ? 'Войдите в свой аккаунт для доступа к персональным настройкам и истории заказов.'
          : 'Создайте аккаунт для быстрого оформления заказов и отслеживания доставки.'
        }
      </p>
    </div>
    
    <div className="space-y-4">
      {benefits.map((benefit, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
          <span className="text-sm text-gray-600 font-light">{benefit}</span>
        </div>
      ))}
    </div>
  </div>
);