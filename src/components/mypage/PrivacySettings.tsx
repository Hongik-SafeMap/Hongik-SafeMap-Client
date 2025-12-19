import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { SectionCard } from '@/components/mypage/SectionCard';
import { ContactInfoCard } from '@/components/mypage/ContactInfoCard';
import { Button } from '@/components/common/Button';
import { Toast } from '@/components/common/Toast';
import type { Contact } from '@/types/Mypage';

export const PrivacySettings = () => {
  const [isMedicalOpen, setIsMedicalOpen] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddContact = () => {
    setContacts((prev) => [
      ...prev,
      { id: contacts?.length + 1, name: '', relationship: '', phoneNumber: '' },
    ]);
  };

  const handleDeleteContact = (id: number) => {
    if (contacts.length > 1) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } else {
      setToastMessage('최소 1개의 비상연락처는 있어야 합니다.');
    }
  };

  const handleChangeContact = (
    id: number,
    field: keyof Omit<Contact, 'id'>,
    value: string,
  ) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id ? { ...contact, [field]: value } : contact,
      ),
    );
  };

  const isContactValid = !contacts.every(
    (contact) =>
      contact.name.trim() !== '' && contact.phoneNumber.trim() !== '',
  );

  const handleSaveContacts = () => {
    if (isContactValid) {
      // 서버 전송
    } else {
      setToastMessage('모든 비상 연락처의 이름과 연락처를 입력해주세요.');
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
      <Explain>이 정보는 긴급 상황에서만 사용되며 안전하게 보관됩니다</Explain>
      <SectionCard
        title="의료 정보"
        detail="긴급 구조 시 필요한 의료 정보"
        right={
          <ClickButton onClick={() => setIsMedicalOpen(!isMedicalOpen)}>
            {isMedicalOpen ? '숨기기' : '보기'}
          </ClickButton>
        }
      >
        {isMedicalOpen ? (
          <Medical></Medical>
        ) : (
          <Medical>
            <div className="hide">의료 정보가 숨겨져 있습니다</div>
            <div className="click">
              우측 상단의 보기 버튼 클릭하여 정보를 확인하세요
            </div>
          </Medical>
        )}
      </SectionCard>

      <SectionCard
        title="비상 연락처"
        detail="긴급 상황 시 연락할 가족/지인 정보"
        right={<ClickButton onClick={handleAddContact}>추가</ClickButton>}
      >
        {contacts.map((contact) => (
          <ContactInfoCard
            key={contact.id}
            contact={contact}
            onDelete={handleDeleteContact}
            onChange={handleChangeContact}
            canDelete={contacts.length > 1}
          />
        ))}
        <Button
          height="36px"
          style={{ fontSize: '14px', fontWeight: '500' }}
          variant={isContactValid ? 'black' : 'gray'}
          disabled={isContactValid}
          onClick={handleSaveContacts}
        >
          비상연락처 저장하기
        </Button>
      </SectionCard>

      {toastMessage && <Toast text={toastMessage} />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Explain = styled.div`
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: 12px;

  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.font.fontSize.text14};
  font-weight: ${({ theme }) => theme.font.fontWeight.regular};
`;

const ClickButton = styled.button`
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: 8px;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.font.fontSize.text12};
  font-weight: ${({ theme }) => theme.font.fontWeight.semibold};
`;

const Medical = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .hide {
    text-align: center;
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.font.fontSize.text16};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
  }

  .click {
    text-align: center;
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.font.fontSize.text14};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
  }
`;
