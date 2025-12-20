import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { SectionCard } from '@/components/mypage/SectionCard';
import { ContactInfoCard } from '@/components/mypage/ContactInfoCard';
import { Toast } from '@/components/common/Toast';
import type {
  EmergencyContactsResponse,
  SensitiveInfoRequest,
  SensitiveInfoResponse,
} from '@/types/Mypage';
import {
  useDeleteEmergencyContact,
  useGetEmergencyContact,
  useGetSensitiveInfo,
  usePutSensitiveInfo,
} from '@/api/mypage';
import { Button } from '../common/Button';
import { InputBox } from '../common/InputBox';
import { Dropdown } from '../common/Dropdown';

export const PrivacySettings = () => {
  const [isMedicalOpen, setIsMedicalOpen] = useState(false);
  const [sensitiveInfo, setSensitiveInfo] = useState<SensitiveInfoResponse>();
  const [contacts, setContacts] = useState<EmergencyContactsResponse>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { data: medicalData } = useGetSensitiveInfo();
  const { data: contactData } = useGetEmergencyContact();

  useEffect(() => {
    if (medicalData) {
      setSensitiveInfo(medicalData);
    }
    if (contactData) {
      setContacts(contactData);
    }
  }, [medicalData, contactData]);

  const { mutate: sensitiveMutation } = usePutSensitiveInfo();

  const handleMedicalChange = useCallback(
    (
      field: keyof Omit<SensitiveInfoResponse, 'sensitiveInfoId'>,
      value: string,
    ) => {
      setSensitiveInfo((prev) => {
        const base = prev || {
          sensitiveInfoId: 0,
          bloodType: '',
          allergies: '',
          chronicDiseases: '',
          medications: '',
        };
        return { ...base, [field]: value };
      });
    },
    [],
  );

  const handleEditMedical = () => {
    const payload: SensitiveInfoRequest = {
      bloodType: sensitiveInfo?.bloodType || 'A+',
      allergies: sensitiveInfo?.allergies || '',
      chronicDiseases: sensitiveInfo?.chronicDiseases || '',
      medications: sensitiveInfo?.medications || '',
    };

    sensitiveMutation(payload, {
      onSuccess: () => {
        setToastMessage('의료 정보가 수정되었습니다.');
      },
      onError: () => {
        setToastMessage(`의료 정보 수정을 실패했습니다.`);
      },
    });
  };

  const { mutate: deleteContact } = useDeleteEmergencyContact();

  const handleAddContact = () => {
    const newId =
      (contacts.length > 0
        ? Math.min(...contacts.map((c) => c.emergencyContactId), 0)
        : 0) - 1;

    setContacts((prev) => [
      ...prev,
      {
        emergencyContactId: newId,
        name: '',
        relationship: '',
        phone: '',
      },
    ]);
  };

  const handleDeleteContact = (id: number) => {
    if (contacts.length <= 1) {
      setToastMessage('최소 1개의 비상연락처는 있어야 합니다.');
      return;
    }

    const isTemporaryId = id < 0;

    if (isTemporaryId) {
      setContacts((prev) => prev.filter((c) => c.emergencyContactId !== id));
      return;
    }

    deleteContact(id, {
      onError: () => {
        setToastMessage('비상연락처 삭제에 실패했습니다.');
      },
    });
  };

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
          <Medical>
            <div className="dropdown">
              <div>혈액형</div>
              <Dropdown
                title="혈액형"
                options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
                selectedOption={sensitiveInfo?.bloodType || 'A+'}
                setSelectedOption={(option: string) => {
                  handleMedicalChange('bloodType', option);
                }}
              />
            </div>

            <InputBox
              title="알레르기"
              placeholder="예) 페니실린"
              value={sensitiveInfo?.allergies}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleMedicalChange('allergies', e.target.value)
              }
            />

            <InputBox
              title="기저 질환"
              placeholder="예) 고혈압"
              value={sensitiveInfo?.chronicDiseases}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleMedicalChange('chronicDiseases', e.target.value)
              }
            />

            <InputBox
              title="복용 약물"
              placeholder="예) 혈압약"
              value={sensitiveInfo?.medications}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleMedicalChange('medications', e.target.value)
              }
            />

            <Button
              height="36px"
              style={{ fontSize: '14px', fontWeight: '500', marginTop: '8px' }}
              variant="black"
              onClick={handleEditMedical}
            >
              의료정보 수정하기
            </Button>
          </Medical>
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
            key={contact.emergencyContactId}
            contact={contact}
            onDelete={handleDeleteContact}
            canDelete={contacts.length > 1}
          />
        ))}
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
  gap: 16px;

  .hide {
    text-align: center;
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.font.fontSize.text16};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
  }

  .click {
    margin-top: -12px;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.font.fontSize.text14};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
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
