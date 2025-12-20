import { styled } from 'styled-components';
import { useState } from 'react';
import Kakao from '@/assets/icons/KakaoLogin.svg';
import Naver from '@/assets/icons/NaverLogin.png';
import { Button } from '@/components/common/Button';
import { InputBox } from '@/components/common/InputBox';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useGeneralLoginMutation } from '@/api/auth';
import type { GeneralLoginRequest } from '@/types/Auth';

const LoginPage = () => {
  const { handleNavigate } = useHandleNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: loginMutation } = useGeneralLoginMutation();

  const handleLoginClick = () => {
    const loginRequest: GeneralLoginRequest = {
      email: email,
      password: password,
    };
    console.log(loginRequest);
    loginMutation(loginRequest, {
      onSuccess: (response) => {
        if (response.status === '관리자') {
          handleNavigate('/admin');
        } else {
          handleNavigate('/user/my');
        }

        setEmail('');
        setPassword('');
      },
      onError: () => {
        alert('로그인 실패! 이메일과 비밀번호를 확인해주세요.');
      },
    });
  };

  return (
    <Container>
      <div className="logo">SafeMap</div>

      <LoginWrapper>
        <InputBox
          title="이메일"
          placeholder="아이디로 사용할 이메일을 입력하세요"
          style={{ height: '40px' }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputBox
          title="비밀번호"
          placeholder="비밀번호를 입력하세요"
          style={{ height: '40px' }}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="black" height="40px" onClick={handleLoginClick}>
          로그인
        </Button>

        <Button
          variant="gray"
          height="40px"
          onClick={() => handleNavigate('/signup')}
        >
          회원가입
        </Button>
      </LoginWrapper>

      <SocialWrapper>
        <div className="else-wrapper">
          <div className="border" />
          <div className="else">또는</div>
          <div className="border" />
        </div>
        <div className="social">
          <img src={Kakao} />
          <img src={Naver} />
        </div>
      </SocialWrapper>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  padding: 0px 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;

  .logo {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.font.fontSize.text20};
    font-weight: ${({ theme }) => theme.font.fontWeight.semibold};
  }
`;

const LoginWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const SocialWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;

  .else-wrapper {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
  }

  .else {
    white-space: nowrap;
    color: ${({ theme }) => theme.colors.gray300};
    font-size: ${({ theme }) => theme.font.fontSize.text14};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
  }

  .border {
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.colors.gray50};
  }

  .social {
    display: flex;
    gap: 20px;
  }

  img {
    width: 50px;
    height: 50px;
  }
`;
