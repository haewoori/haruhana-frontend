import styled from 'styled-components';
import Link from 'next/link';

export const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  z-index: 100;
`;

export const NavInner = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 5rem;
  max-width: 768px;
  margin: 0 auto;
`;

export const NavItem = styled(Link)<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  width: 33.333%;
  color: ${(props) => (props.$isActive ? '#0ea5e9' : '#9ca3af')};
  transition: color 0.3s ease;

  &:hover {
    color: #0ea5e9;
  }
`;

export const NavIcon = styled.span`
  font-size: 1.875rem;
`;

export const NavLabel = styled.span<{ $isActive: boolean }>`
  font-size: 0.75rem;
  margin-top: 0.25rem;
  font-weight: ${(props) => (props.$isActive ? '500' : 'normal')};
`;