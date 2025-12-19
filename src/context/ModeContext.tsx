import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';

interface ModeContextType {
  isAdminMode: boolean;
  changeMode: () => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

interface ModeProviderProps {
  children: React.ReactNode;
}

export const ModeProvider = ({ children }: ModeProviderProps) => {
  const [isAdminMode, setIsAdminMode] = useState(false);

  const { handleNavigate } = useHandleNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAdminMode) {
      if (!location.pathname.startsWith('/admin')) {
        handleNavigate('/admin');
      }
    } else {
      if (location.pathname.startsWith('/admin')) {
        handleNavigate('/user');
      }
    }
  }, [isAdminMode]);

  const changeMode = () => {
    setIsAdminMode((prev) => !prev);
  };

  return (
    <ModeContext.Provider value={{ isAdminMode, changeMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode: context 생성 에러');
  }
  return context;
};
