'use client';

import { usePathname } from 'next/navigation';
import { NavContainer, NavInner, NavItem, NavIcon, NavLabel } from './NavigationBar.style';
const NavigationBar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  return (
      <NavContainer>
        <NavInner>
          <NavItem href="/feed" $isActive={isActive('/feed')}>
            <NavIcon className="material-icons">home</NavIcon>
            <NavLabel $isActive={isActive('/feed')}>홈</NavLabel>
          </NavItem>
          <NavItem href="/study" $isActive={isActive('/study')}>
            <NavIcon className="material-icons">school</NavIcon>
            <NavLabel $isActive={isActive('/study')}>스터디</NavLabel>
          </NavItem>
          <NavItem href="/my" $isActive={isActive('/my')}>
            <NavIcon className="material-icons">person</NavIcon>
            <NavLabel $isActive={isActive('/my')}>마이</NavLabel>
          </NavItem>
        </NavInner>
      </NavContainer>
  );
};

export default NavigationBar;