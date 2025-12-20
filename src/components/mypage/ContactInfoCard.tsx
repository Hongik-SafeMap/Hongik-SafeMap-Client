import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';
import { InputBox } from '@/components/common/InputBox';
import { Dropdown } from '@/components/common/Dropdown';
import type {
  EmergencyContact,
  EmergencyContactsRequest,
} from '@/types/Mypage';
import { Toast } from '../common/Toast';
import { usePostEmergencyContact, usePutEmergencyContact } from '@/api/mypage';

interface ContactInfoCardProps {
  contact: EmergencyContact;
  onDelete: (id: number) => void;
  canDelete: boolean;
}

export const ContactInfoCard = ({
  contact,
  onDelete,
  canDelete,
}: ContactInfoCardProps) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentContact, setCurrentContact] =
    useState<EmergencyContact>(contact);

  useEffect(() => {
    setCurrentContact(contact);
  }, [contact]);

  const isContactValid =
    currentContact.name.trim() !== '' && currentContact.phone.trim() !== '';

  const isExistingContact =
    currentContact.emergencyContactId && currentContact.emergencyContactId > 0;

  const { mutate: editContact } = usePutEmergencyContact();
  const { mutate: saveContact } = usePostEmergencyContact();

  const handleChange = useCallback(
    (
      field: keyof Omit<EmergencyContact, 'emergencyContactId'>,
      value: string,
    ) => {
      setCurrentContact((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleSaveContact = () => {
    if (!isContactValid) {
      setToastMessage('비상 연락처의 이름과 연락처를 입력해주세요.');
      return;
    }

    const payload: EmergencyContactsRequest = {
      name: currentContact.name,
      relationship: currentContact.relationship,
      phone: currentContact.phone,
    };

    if (isExistingContact) {
      editContact(
        { emergencyContactId: currentContact.emergencyContactId, payload },
        {
          onSuccess: () => {
            setToastMessage('비상 연락처가 수정되었습니다.');
          },
          onError: () => {
            setToastMessage(`비상 연락처 수정을 실패했습니다.`);
          },
        },
      );
    } else {
      saveContact(payload, {
        onError: () => {
          setToastMessage(`비상 연락처 등록을 실패했습니다.`);
        },
      });
    }
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
      <div className="top">
        <div className="contact">비상연락처</div>
        {canDelete && (
          <div
            className="delete"
            onClick={() => onDelete(currentContact.emergencyContactId)}
          >
            삭제
          </div>
        )}
      </div>

      <div className="middle">
        <InputBox
          title="이름"
          placeholder="이름"
          value={currentContact.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange('name', e.target.value)
          }
        />

        <div className="dropdown">
          <div>관계</div>
          <Dropdown
            title="관계"
            options={['배우자', '자녀', '부모', '친구', '지인', '기타']}
            selectedOption={currentContact.relationship}
            setSelectedOption={(option: string) => {
              handleChange('relationship', option);
            }}
          />
        </div>
      </div>

      <InputBox
        title="연락처"
        placeholder="01012345678"
        value={currentContact.phone}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange('phone', e.target.value)
        }
      />

      <Button
        height="36px"
        style={{ fontSize: '14px', fontWeight: '500' }}
        variant={isContactValid ? 'black' : 'gray'}
        disabled={!isContactValid}
        onClick={handleSaveContact}
      >
        비상연락처 {isExistingContact ? '수정' : '저장'}하기
      </Button>

      {toastMessage && <Toast text={toastMessage} />}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: 12px;

  .top {
    display: flex;
    justify-content: space-between;
  }

  .contact {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.font.fontSize.text16};
    font-weight: ${({ theme }) => theme.font.fontWeight.bold};
  }

  .delete {
    color: ${({ theme }) => theme.colors.mainRed};
    font-size: ${({ theme }) => theme.font.fontSize.text14};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
  }

  .middle {
    display: flex;
    gap: 8px;
  }

  .dropdown {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;

    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.font.fontSize.text14};
    font-weight: ${({ theme }) => theme.font.fontWeight.semibold};
  }
`;
