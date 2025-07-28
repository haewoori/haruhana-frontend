import styled from "@emotion/styled";

export const colors = {
  primary: {
    main: '#3B82F6',
  },
  neutral: {
    800: '#1F2937',
  },
  success: '#4B5563',
  error: '#4B5563',
  info: '#4B5563',
  warning: '#4B5563',
};

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: auto;
  max-width: 90%;
`;

export const ToastMessage = styled.div<{ type: 'success' | 'error' | 'info' | 'warning' }>`
  background-color: ${props => {
    switch (props.type) {
      case 'success': return colors.success;
      case 'error': return colors.error;
      case 'warning': return colors.warning;
      case 'info': 
      default: return colors.primary.main;
    }
  }};
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  max-width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: slideUp 0.3s ease-out forwards;
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ToastContent = styled.div`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  margin-left: 10px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`;