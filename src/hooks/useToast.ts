import { useState, useCallback } from 'react';
import { ToastItem } from '@/components/Toast/ToastContainer';
import { ToastType } from '@/components/Toast/Toast';

let toastCounter = 0;

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((
    message: string, 
    type: ToastType = 'info', 
    duration: number = 3000
  ) => {
    const id = `toast-${Date.now()}-${toastCounter++}`;
    const newToast: ToastItem = {
      id,
      message,
      type,
      duration
    };

    setToasts(prev => [...prev, newToast]);
    return id;
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    showToast,
    hideToast,
    clearToasts
  };
};