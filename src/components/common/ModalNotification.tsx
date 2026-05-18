import styled from 'styled-components';
import { useEffect, useState } from 'react';
import ModalClose from '@/assets/icons/Exit.svg?react';
import { Toast } from '@/components/common/Toast';
import { handleAllowNotification } from '@/firebase';
import { Button } from './Button';

interface ModalProps {
  onClose: () => void;
}

export const ModalNotification = ({ onClose }: ModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 1500);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClick = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const token = await handleAllowNotification();

      if (token) {
        onClose();
        showToast('알림 허용이 완료되었습니다.');
      } else {
        onClose();
        alert('토큰을 가져오지 못했습니다. 알림 권한이 거부되었습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('알림 설정 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalWrapper>
      <ModalXImg onClick={onClose} />

      <ModalLabelWrapper>
        <ModalTitleLabel>
          <div>알림 받기</div>
        </ModalTitleLabel>
        <ModalDetailLabel>
          <div>재난 상황 알림을 받으려면 "확인" 버튼을 눌러주세요.</div>
        </ModalDetailLabel>
      </ModalLabelWrapper>

      <ModalButtonWrapper>
        <Button variant="gray" onClick={onClose}>
          아니요
        </Button>
        <Button variant="red" onClick={handleClick} disabled={isSubmitting}>
          알림 받기
        </Button>
      </ModalButtonWrapper>

      {toastMessage && <Toast text={toastMessage} />}
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  padding: 56px 20px 20px 20px;
  width: 272px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
`;

const ModalXImg = styled(ModalClose)`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;

const ModalLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ModalTitleLabel = styled.div`
  color: ${({ theme }) => theme.colors.gray1000};
  font-size: ${({ theme }) => theme.font.fontSize.title20};
  font-weight: ${({ theme }) => theme.font.fontWeight.bold};
  text-align: center;
`;

const ModalDetailLabel = styled.div`
  color: ${({ theme }) => theme.colors.gray700};
  font-size: ${({ theme }) => theme.font.fontSize.body14};
  font-weight: ${({ theme }) => theme.font.fontWeight.medium};
  line-height: 140%;
  text-align: center;
`;

const ModalButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;
