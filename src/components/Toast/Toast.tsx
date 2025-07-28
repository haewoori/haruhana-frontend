import React, { useEffect, useCallback } from 'react';
import { MdClose } from 'react-icons/md';
import { ToastMessage, ToastContent, CloseButton } from './Toast.style';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ 
  id, 
  message, 
  type = 'info', 
  duration = 3000, 
  onClose 
}) => {
  const handleClose = useCallback(() => {
    onClose(id);
  }, [id, onClose]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, handleClose]);

  return (
    <ToastMessage type={type} role="alert">
      <ToastContent>{message}</ToastContent>
      <CloseButton onClick={handleClose} aria-label="닫기">
        <MdClose size={16} />
      </CloseButton>
    </ToastMessage>
  );
};

export default Toast;