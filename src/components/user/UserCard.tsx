import styled from 'styled-components';
import Check from '@/assets/icons/CheckSmall.svg?react';
import { Button } from '@/components/common/Button';
import { Tag } from '@/components/common/Tag';
import type { Member } from '@/types/Admin';
import { useAdminPatchMemberCredible } from '@/api/admin';
import { useEffect, useState } from 'react';

interface UserCardProps {
  member: Member;
}

export const UserCard = ({ member }: UserCardProps) => {
  const items = [
    { type: 'email', value: member.email, title: '이메일' },
    {
      type: 'reportCount',
      value: `${member.reportCount}`,
      title: '제보건',
    },
    { type: 'accuracy', value: member.accuracy, title: '정확도' },
  ];

  const [isCredible, setIsCredible] = useState(false);

  const { mutate: toggleCredible } = useAdminPatchMemberCredible(member.id);

  const handleCredibleClick = () => {
    toggleCredible(undefined, {
      onSuccess: () => {
        setIsCredible(!isCredible);
      },
    });
  };

  useEffect(() => {
    setIsCredible(member.isCredible);
  }, [member.isCredible]);

  const getVariant = (accuracy: number) => {
    if (accuracy >= 90) return 'black';
    else if (accuracy >= 70) return 'gray';
    else return 'red';
  };

  return (
    <Container>
      <div className="top">
        <div>{member.name}</div>
        {isCredible ? (
          <Tag
            variant="black"
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Check />
            공신력 사용자
          </Tag>
        ) : (
          <Tag variant="white">일반 사용자</Tag>
        )}
      </div>

      <InfoWrapper>
        <div className="leftWrapper">
          {items.map((item) => (
            <div key={item.type} className="info-title">
              {item.title}
            </div>
          ))}
        </div>
        <div className="rightWrapper">
          {items.map((item) => (
            <div key={item.type} className="info-detail">
              {item.type === 'accuracy' ? (
                <Tag variant={getVariant(member.accuracy)}>{item.value}%</Tag>
              ) : (
                item.value
              )}
            </div>
          ))}
        </div>
      </InfoWrapper>

      <Button
        height="36px"
        style={{ fontSize: '14px', fontWeight: '500' }}
        variant={isCredible ? 'white' : 'black'}
        onClick={handleCredibleClick}
      >
        {isCredible ? '지정 해제' : '공신력 부여'}
      </Button>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray50};
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);

  .top {
    display: flex;
    gap: 20px;
    align-items: center;

    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.font.fontSize.text16};
    font-weight: ${({ theme }) => theme.font.fontWeight.semibold};
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  gap: 20px;

  .leftWrapper,
  .rightWrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  // .leftWrapper {
  //   width: 56px;
  // }

  .info-title {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.font.fontSize.text14};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
  }

  .info-detail {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.font.fontSize.text14};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
  }
`;
