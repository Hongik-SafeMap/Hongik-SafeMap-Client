import styled from 'styled-components';
import ArrowLeft from '@/assets/icons/ArrowLeft.svg?react';
import { Button } from '@/components/common/Button';
import { NavBar } from '@/components/common/NavBar';
import { InputBox } from '@/components/common/InputBox';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useSignupMutation } from '@/api/auth';
import type { SignupRequest } from '@/types/Auth';
import { useEffect, useState } from 'react';

const SignupPage = () => {
  const { handleGoBack, handleNavigate } = useHandleNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const validateField = (fieldName: string, value: string) => {
    let errorMessage = '';

    switch (fieldName) {
      case 'email':
        if (!value) {
          errorMessage = '이메일을 입력해주세요.';
        }
        break;
      case 'name':
        if (!value) {
          errorMessage = '이름을 입력해주세요.';
        } else if (
          value.length < 1 ||
          value.length > 6 ||
          /[^\uAC00-\uD7AF]/.test(value)
        ) {
          errorMessage = '한글 1~6자 이내로 입력해주세요.';
        }
        break;
      case 'password':
        if (!value) {
          errorMessage = '비밀번호를 입력해주세요.';
        } else if (value.length < 8) {
          errorMessage = '새 비밀번호는 8자 이상이어야 합니다.';
        } else if (
          !/[!@#$%^&*()]/.test(value) ||
          !/[a-zA-Z]/.test(value) ||
          !/[0-9]/.test(value)
        ) {
          errorMessage = '영문, 숫자, 특수문자 최소 하나씩 포함해야 합니다.';
        }
        break;
      case 'confirmPassword':
        if (!value) {
          errorMessage = '비밀번호 확인을 입력해주세요.';
        } else if (password !== value) {
          errorMessage = '비밀번호가 일치하지 않습니다.';
        }
        break;
      case 'phone':
        if (!value) {
          errorMessage = '전화번호를 입력해주세요.';
        } else if (!/^\d+$/.test(value)) {
          errorMessage = '전화번호는 숫자만 입력해주세요.';
        }
        break;
      default:
        break;
    }
    return errorMessage;
  };

  useEffect(() => {
    const newErrors = { ...errors };

    newErrors.name = validateField('name', name);
    newErrors.email = validateField('email', email);
    newErrors.password = validateField('newPassword', password);
    newErrors.confirmPassword = validateField(
      'confirmNewPassword',
      confirmPassword,
    );
    newErrors.phone = validateField('phone', phone);

    setErrors(newErrors);
  }, [password, confirmPassword]);

  const handleBlur = (fieldName: string) => {
    let errorMessage = '';
    if (fieldName === 'name') {
      errorMessage = validateField('name', name);
    } else if (fieldName === 'email') {
      errorMessage = validateField('email', email);
    } else if (fieldName === 'password') {
      errorMessage = validateField('password', password);
    } else if (fieldName === 'confirmPassword') {
      errorMessage = validateField('confirmPassword', confirmPassword);
    } else if (fieldName === 'phone') {
      errorMessage = validateField('phone', phone);
    }

    setErrors((prev) => ({ ...prev, [fieldName]: errorMessage }));
  };

  const { mutate: signupMutation } = useSignupMutation();

  const handleSignupButtonClick = () => {
    const signupRequset: SignupRequest = {
      name: name,
      email: email,
      password: password,
      passwordConfirm: confirmPassword,
      phone: phone,
    };
    console.log(signupRequset);
    signupMutation(signupRequset, {
      onSuccess: () => {
        setEmail('');
        setName('');
        setPassword('');
        setConfirmPassword('');
        setPhone('');
        handleNavigate('/login');
      },
    });
  };

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>회원가입</NavCenter>}
      />

      <Wrapper>
        <Section>
          <InputBox
            title="이메일"
            placeholder="아이디로 사용할 이메일을 입력하세요"
            style={{ height: '40px' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
          />
          {errors.name !== '' && <ErrorMessage>{errors.email}</ErrorMessage>}
        </Section>

        <Section>
          <InputBox
            title="이름"
            placeholder="이름을 입력하세요"
            style={{ height: '40px' }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleBlur('name')}
          />
          {errors.email !== '' && <ErrorMessage>{errors.name}</ErrorMessage>}
        </Section>

        <Section>
          <InputBox
            title="비밀번호"
            placeholder="비밀번호를 입력하세요"
            style={{ height: '40px' }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleBlur('password')}
          />
          {errors.password !== '' && (
            <ErrorMessage>{errors.password}</ErrorMessage>
          )}
        </Section>

        <Section>
          <InputBox
            title="비밀번호 확인"
            placeholder="비밀번호 확인을 입력하세요"
            style={{ height: '40px' }}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => handleBlur('confirmPassword')}
          />
          {errors.confirmPassword !== '' && (
            <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
          )}
        </Section>

        <Section>
          <InputBox
            title="전화번호"
            placeholder="01012345678"
            style={{ height: '40px' }}
            value={phone}
            max={11}
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => handleBlur('phone')}
          />
          {errors.phone !== '' && <ErrorMessage>{errors.phone}</ErrorMessage>}
        </Section>

        <Button
          height="40px"
          style={{ height: '40px' }}
          variant="black"
          onClick={handleSignupButtonClick}
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
  padding-bottom: 80px;
  // min-height: 100vh;
  display: flex;
  flex-direction: column;
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
  gap: 24px;
  justify-content: center;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.mainRed};
  font-size: ${({ theme }) => theme.font.fontSize.text12};
  font-weight: ${({ theme }) => theme.font.fontWeight.medium};
`;
