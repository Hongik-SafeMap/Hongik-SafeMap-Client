import styled, { keyframes } from 'styled-components';
import { useEffect } from 'react';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';

const SplashPage = () => {
  const { handleNavigate } = useHandleNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNavigate('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container>
      <div className="title">SafeMap</div>
      <div className="detail">재난 안전 관리 플랫폼</div>
    </Container>
  );
};

export default SplashPage;

const fadeOut = keyframes`
  0% {
    opacity : 1;
  }
  100% {
    opacity : 0;
  } 
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  gap: 16px;
  justify-content: center;
  align-items: center;

  animation: ${fadeOut} 2s ease-in-out both;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.font.fontSize.text24};
    font-weight: ${({ theme }) => theme.font.fontWeight.semibold};
  }

  .detail {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.font.fontSize.text16};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
  }
`;
