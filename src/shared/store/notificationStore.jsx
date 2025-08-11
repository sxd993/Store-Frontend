import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
  // Состояние
  message: '',
  type: 'success',
  isVisible: false,

  // Показать success уведомление
  showSuccess: (message) => set({
    message,
    type: 'success',
    isVisible: true
  }),

  // Скрыть уведомление
  hideNotification: () => set({
    message: '',
    isVisible: false
  }),

  // Авто-скрытие через timeout
  showWithTimeout: (message, type = 'success', timeout = 3000) => {
    set({
      message,
      type,
      isVisible: true
    });
    
    setTimeout(() => {
      set({
        message: '',
        isVisible: false
      });
    }, timeout);
  }
}));