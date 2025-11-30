import styled from 'styled-components';
import { ReactComponent as Arrow } from '@/assets/icons/ArrowLeft.svg';
import { InputBox } from '@/components/common/InputBox';
import { NavBar } from '@/components/common/NavBar';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';

const SignupPage = () => {
  const { handleGoBack } = useHandleNavigate();

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>회원가입</NavCenter>}
      />
      <Arrow />
      <InputBox title="아이디" placeholder="아이디" />
      <InputBox title="비밀번호" placeholder="비밀번호" type="password" />
    </Container>
  );
};

export default SignupPage;

const Container = styled.div`
  padding: 0px 20px;
  min-height: 100vh;
`;

const NavLeft = styled.div`
  cursor: pointer;
`;

const NavCenter = styled.label`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.font.fontSize.text18};
  font-weight: ${({ theme }) => theme.font.fontWeight.bold};
`;
