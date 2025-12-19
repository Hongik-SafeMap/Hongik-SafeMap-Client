import { styled } from 'styled-components';
import { useEffect, useState } from 'react';

interface ToastProps {
  text: string;
}

export const Toast = ({ text }: ToastProps) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ToastWrapper $fade={fade}>
      <Message>{text}</Message>
    </ToastWrapper>
  );
};

const ToastWrapper = styled.div<{ $fade: boolean }>`
  padding: 16px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray600};
  box-sizing: border-box;

  position: fixed;
  left: 20px;
  right: 20px;
  bottom: 80px;

  opacity: ${({ $fade }) => ($fade ? 0 : 1)};
  transition: opacity 1.2s ease;
`;

const Message = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font.fontSize.text16};
  font-weight: ${({ theme }) => theme.font.fontWeight.semibold};
  white-space: nowrap;
`;
