import styled from 'styled-components';
import type React from 'react';
import Star from '@/assets/icons/Star.svg?react';
import StarFilled from '@/assets/icons/StarFilled.svg?react';
import { Button } from '@/components/common/Button';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import type { GuideItem } from '@/types/Guide';

interface GuideCardProps {
  guide: GuideItem;
  isFavorite: boolean;
  onToggleFavorite: (guideId: string, e: React.MouseEvent) => void;
}

export const GuideCard = ({
  guide,
  isFavorite,
  onToggleFavorite,
}: GuideCardProps) => {
  const { handleNavigate } = useHandleNavigate();

  return (
    <Container onClick={() => handleNavigate(`/user/guide/${guide.id}`)}>
      <div className="top">
        <div>{guide.title}</div>
        <button
          onClick={(e) => {
            onToggleFavorite(guide.id, e);
          }}
        >
          {isFavorite ? <StarFilled /> : <Star />}
        </button>
      </div>
      <div className="middle">{guide.detail}</div>
      <div className="bottom">
        <Button
          width="100px"
          // height="28px"
          style={{
            marginTop: '8px',
            padding: '8px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
          }}
          variant="black"
          onClick={() => handleNavigate(`/user/guide/${guide.id}`)}
        >
          자세히 보기
        </Button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: 16px;

  &:hover {
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
    cursor: pointer;
  }

  .top {
    display: flex;
    justify-content: space-between;

    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.font.fontSize.text16};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
  }

  .middle {
    color: ${({ theme }) => theme.colors.gray600};
    font-size: ${({ theme }) => theme.font.fontSize.text14};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
  }

  .bottom {
    display: flex;
    justify-content: end;
  }
`;
