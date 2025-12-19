import styled from 'styled-components';
import ArrowLeft from '@/assets/icons/ArrowLeft.svg?react';
import { Button } from '@/components/common/Button';
import { NavBar } from '@/components/common/NavBar';
import { InputBox } from '@/components/common/InputBox';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';

const SignupPage = () => {
  const { handleGoBack } = useHandleNavigate();

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>회원가입</NavCenter>}
      />
      <Wrapper>
        <InputBox
          title="아이디"
          placeholder="아이디를 입력하세요"
          style={{ height: '56px' }}
        />
        <InputBox
          title="비밀번호"
          placeholder="비밀번호를 입력하세요"
          type="password"
        />
        <Button
          variant="subBlue"
          height="48px"
          style={{ marginTop: '28px', height: '56px' }}
        >
          회원가입
        </Button>
      </Wrapper>
    </Container>
  );
};

export default SignupPage;

const Container = styled.div`
  padding: 0px 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const NavLeft = styled(ArrowLeft)`
  cursor: pointer;
`;

const NavCenter = styled.label`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.font.fontSize.text18};
  font-weight: ${({ theme }) => theme.font.fontWeight.bold};
`;

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
`;
