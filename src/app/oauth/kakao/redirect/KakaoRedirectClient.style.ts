import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #f5f5f5;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 123, 255, 0.2);
  border-radius: 50%;
  border-top-color: #007bff;
  animation: ${spin} 1s ease-in-out infinite;
`;

export const ErrorContainer = styled.div`
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;