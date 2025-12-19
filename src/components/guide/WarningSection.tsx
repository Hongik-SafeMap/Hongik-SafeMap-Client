import styled from 'styled-components';

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
      {warnings.map((warning) => (
        <div className="warning">
          ⚠️ <div>{warning}</div>
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

    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.font.fontSize.text14};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
  }
`;
