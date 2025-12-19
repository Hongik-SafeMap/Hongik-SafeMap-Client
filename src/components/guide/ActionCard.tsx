import styled from 'styled-components';
import { useState } from 'react';
import Chevron from '@/assets/icons/ChevronUp.svg?react';
import type { Actions } from '@/types/Guide';

interface ActionCardProps {
  index: number;
  guide: Actions;
}

export const ActionCard = ({ index, guide }: ActionCardProps) => {
  const [showAction, setShowAction] = useState(false);

  return (
    <ActionWrapper>
      <div className="top" onClick={() => setShowAction(!showAction)}>
        <div className="left">
          <div className="number">{index + 1}</div>
          <div className="situation">{guide.title}</div>
        </div>
        <ActionToggle down={showAction} />
      </div>
      {showAction && <Action>{guide.guide}</Action>}
    </ActionWrapper>
  );
};

const ActionWrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: 12px;

  .top {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .left {
    display: flex;
    gap: 8px;
  }

  .number {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.black};
    border-radius: 50%;

    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.font.fontSize.text16};
    font-weight: ${({ theme }) => theme.font.fontWeight.semibold};
  }

  .situation {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.font.fontSize.text16};
    font-weight: ${({ theme }) => theme.font.fontWeight.semibold};
  }
`;

const Action = styled.div`
  color: ${({ theme }) => theme.colors.gray500};
  font-size: ${({ theme }) => theme.font.fontSize.text14};
  font-weight: ${({ theme }) => theme.font.fontWeight.medium};
`;

const ActionToggle = styled(Chevron)<{ down: boolean }>`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray500};
  transform: ${({ down }) => (down ? 'none' : 'rotate(180deg)')};
  transition: transform 0.7s ease;
`;
