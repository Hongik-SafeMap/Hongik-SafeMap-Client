import styled from 'styled-components';
import Warning from '@/assets/icons/Warning.svg?react';

interface WarningSectionProps {
  warnings: string[] | undefined;
}

export const WarningSection = ({ warnings }: WarningSectionProps) => {
  if (!warnings || warnings.length === 0) {
    return null;
  }

  return (
    <SectionWrapper>
      <div className="section">주의사항</div>
      {warnings.map((warning, index) => (
        <div key={index} className="warning">
          <Warning /> <div>{warning}</div>
        </div>
      ))}
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.font.fontSize.text16};
  font-weight: ${({ theme }) => theme.font.fontWeight.semibold};

  .warning {
    display: flex;
    gap: 8px;
    align-items: center;

    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.font.fontSize.text14};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};

    svg {
      color: ${({ theme }) => theme.colors.mainRed};
    }
  }
`;
