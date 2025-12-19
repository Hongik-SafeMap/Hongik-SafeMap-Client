import styled from 'styled-components';
import { InputBox } from '@/components/common/InputBox';
import { Dropdown } from '@/components/common/Dropdown';
import type { Contact } from '@/types/Mypage';

interface ContactInfoCardProps {
  contact: Contact;
  onDelete: (id: number) => void;
  onChange: (
    id: number,
    field: keyof Omit<Contact, 'id'>,
    value: string,
  ) => void;
  canDelete: boolean;
}

export const ContactInfoCard = ({
  contact,
  onDelete,
  onChange,
  canDelete,
}: ContactInfoCardProps) => {
  return (
    <Container>
      <div className="top">
        <div className="contact">비상연락처 {contact.id}</div>
        {canDelete && (
          <div className="delete" onClick={() => onDelete(contact.id)}>
            삭제
          </div>
        )}
      </div>

      <div className="middle">
        <InputBox
          title="이름"
          placeholder="이름"
          value={contact.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(contact.id, 'name', e.target.value)
          }
        />

        <div className="dropdown">
          <div>관계</div>
          <Dropdown
            title="관계"
            options={['배우자', '자녀', '부모', '친구', '지인', '기타']}
            selectedOption={[contact.relationship]}
            setSelectedOption={(option: string[]) => {
              onChange(contact.id, 'relationship', option[0]);
            }}
          />
        </div>
      </div>

      <InputBox
        title="연락처"
        placeholder="연락처"
        value={contact.phoneNumber}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(contact.id, 'phoneNumber', e.target.value)
        }
      />
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
    color: ${({ theme }) => theme.colors.gray400};
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
