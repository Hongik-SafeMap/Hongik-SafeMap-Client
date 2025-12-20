import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { SectionCard } from '@/components/mypage/SectionCard';
import { InputBox } from '@/components/common/InputBox';
import { Button } from '@/components/common/Button';
import { Toast } from '@/components/common/Toast';
import { useLogoutMutation } from '@/api/auth';
import { useGetMy, usePatchPassword } from '@/api/mypage';
import type { PasswordRequest } from '@/types/Mypage';

export const AccountInfo = () => {
  const [email, setEmail] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    apiError: '',
  });

  const { data } = useGetMy();
  useEffect(() => {
    setEmail(data?.email || '');
  }, [data]);

  const validateField = (fieldName: string, value: string) => {
    let errorMessage = '';

    switch (fieldName) {
      case 'currentPassword':
        if (!value) errorMessage = '현재 비밀번호를 입력해주세요.';
        break;
      case 'newPassword':
        if (!value) {
          errorMessage = '새 비밀번호를 입력해주세요.';
        } else if (value.length < 8) {
          errorMessage = '새 비밀번호는 8자 이상이어야 합니다.';
        } else if (
          !/[!@#$%^&*()]/.test(value) ||
          !/[a-zA-Z]/.test(value) ||
          !/[0-9]/.test(value)
        ) {
          errorMessage = '영문, 숫자, 특수문자를 포함해야 합니다.';
        } else if (currentPassword && value === currentPassword) {
          errorMessage = '현재 비밀번호와 다른 비밀번호를 사용해주세요.';
        }
        break;
      case 'confirmNewPassword':
        if (!value) {
          errorMessage = '새 비밀번호 확인을 입력해주세요.';
        } else if (newPassword !== value) {
          errorMessage = '새 비밀번호가 일치하지 않습니다.';
        }
        break;
      default:
        break;
    }
    return errorMessage;
  };

  useEffect(() => {
    const newErrors = { ...errors, apiError: '' };

    newErrors.currentPassword = validateField(
      'currentPassword',
      currentPassword,
    );
    newErrors.newPassword = validateField('newPassword', newPassword);
    newErrors.confirmNewPassword = validateField(
      'confirmNewPassword',
      confirmNewPassword,
    );

    setErrors(newErrors);
  }, [currentPassword, newPassword, confirmNewPassword]);

  const handleBlur = (fieldName: string) => {
    let errorMessage = '';
    if (fieldName === 'currentPassword') {
      errorMessage = validateField('currentPassword', currentPassword);
    } else if (fieldName === 'newPassword') {
      errorMessage = validateField('newPassword', newPassword);
    } else if (fieldName === 'confirmNewPassword') {
      errorMessage = validateField('confirmNewPassword', confirmNewPassword);
    }
    setErrors((prev) => ({ ...prev, [fieldName]: errorMessage }));
  };

  const isErrorExist = Object.values(errors).some((msg) => msg !== '');

  const { mutate: passwordMutation } = usePatchPassword();
  const handleChangePassword = () => {
    setErrors((prev) => ({ ...prev, apiError: '' }));

    if (isErrorExist) {
      return;
    }

    const passwordRequest: PasswordRequest = {
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    passwordMutation(passwordRequest, {
      onSuccess: () => {
        setToastMessage('비밀번호가 성공적으로 변경되었습니다!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      },
      onError: () => {
        setErrors((prev) => ({
          ...prev,
          apiError: '비밀번호 변경에 실패했습니다.',
        }));
      },
    });
  };

  const { mutate: logoutMutation } = useLogoutMutation();
  const handleLogoutClick = () => {
    logoutMutation(undefined, {
      onError: () => {
        alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
      },
    });
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [toastMessage]);

  return (
    <Container>
      <SectionCard title="아이디" detail="로그인에 사용되는 아이디(이메일)">
        <InputBox title="아이디" placeholder="사용자 이메일" value={email} />
        <div className="id">아이디는 변경할 수 없습니다</div>
      </SectionCard>

      <SectionCard title="비밀번호 변경" detail="안전한 비밀번호 사용 권장">
        <InputBox
          title="현재 비밀번호"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          onBlur={() => handleBlur('currentPassword')}
        />
        {errors.currentPassword !== '' && (
          <ErrorMessage>{errors.currentPassword}</ErrorMessage>
        )}
        <InputBox
          title="새 비밀번호"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          onBlur={() => handleBlur('newPassword')}
        />
        {errors.newPassword !== '' && (
          <ErrorMessage>{errors.newPassword}</ErrorMessage>
        )}
        <InputBox
          title="새 비밀번호 확인"
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          onBlur={() => handleBlur('confirmNewPassword')}
        />
        {errors.confirmNewPassword !== '' && (
          <ErrorMessage>{errors.confirmNewPassword}</ErrorMessage>
        )}
        <Button
          height="36px"
          style={{ fontSize: '14px', fontWeight: '500' }}
          variant={isErrorExist ? 'gray' : 'black'}
          disabled={isErrorExist}
          onClick={handleChangePassword}
        >
          비밀번호 변경하기
        </Button>
        {errors.apiError && <ErrorMessage>{errors.apiError}</ErrorMessage>}
      </SectionCard>

      <LogoutButton onClick={handleLogoutClick}>로그아웃</LogoutButton>

      {toastMessage && <Toast text={toastMessage} />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .id {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.font.fontSize.text12};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.mainRed};
  font-size: ${({ theme }) => theme.font.fontSize.text12};
  font-weight: ${({ theme }) => theme.font.fontWeight.medium};
`;

const LogoutButton = styled.button`
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.font.fontSize.text14};
  font-weight: ${({ theme }) => theme.font.fontWeight.bold};
`;
