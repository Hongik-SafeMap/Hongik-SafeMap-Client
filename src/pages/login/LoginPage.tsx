import { styled } from 'styled-components';
import Kakao from '@/assets/icons/KakaoLogin.svg';
import Naver from '@/assets/icons/NaverLogin.png';
import { Button } from '@/components/common/Button';
import { InputBox } from '@/components/common/InputBox';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';

const LoginPage = () => {
  const { handleNavigate } = useHandleNavigate();

  return (
    <Container>
      <div className="logo">SafeMap</div>

      <LoginWrapper>
        <InputBox title="아이디" placeholder="아이디" />
        <InputBox title="비밀번호" placeholder="비밀번호" type="password" />
        <Button variant="subBlue" height="48px">
          로그인
        </Button>
        <Button
          variant="gray"
          height="48px"
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
