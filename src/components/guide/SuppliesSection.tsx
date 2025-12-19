import styled from 'styled-components';
import { useState } from 'react';
import { SuppliesCheckBox } from '@/components/guide/SuppliesCheckBox';

interface SuppliesSectionProps {
  supplies: string[] | undefined;
}

export const SuppliesSection = ({ supplies }: SuppliesSectionProps) => {
  if (!supplies || supplies.length === 0) {
    return null;
  }

  const [checkedSupplies, setCheckedSupplies] = useState<{
    [key: string]: boolean;
  }>({});

  const calculateProgress = () => {
    const total = supplies.length ?? 6;
    const checked = Object.values(checkedSupplies).filter(Boolean).length;
    return Math.round((checked / total) * 100);
  };

  const toggleSupplyCheck = (key: string) => {
    setCheckedSupplies((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <SectionWrapper>
      <div className="section">
        필수 준비물
        <div className="progress">진행도: {calculateProgress()}%</div>
      </div>

      <ProgressBar percent={calculateProgress()}>
        <div className="fill" />
      </ProgressBar>

      <Supply>
        {supplies.map((supply) => (
          <SuppliesCheckBox
            key={supply}
            id={supply}
            label={supply}
            checked={checkedSupplies[supply]}
            onChange={() => toggleSupplyCheck(supply)}
          />
        ))}
      </Supply>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .section {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.font.fontSize.text16};
    font-weight: ${({ theme }) => theme.font.fontWeight.semibold};
  }

  .progress {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.font.fontSize.text12};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
  }
`;

const Supply = styled.div`
  display: grid;
  gap: 12px;

  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.font.fontSize.text14};
  font-weight: ${({ theme }) => theme.font.fontWeight.medium};
`;

const ProgressBar = styled.div<{ percent: number }>`
  width: 100%;
  height: 10px;
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: 16px;

  .fill {
    width: ${({ percent }) => percent}%;
    height: 100%;
    border-radius: 16px 0px 0px 16px;
    background: ${({ theme }) => theme.colors.gray700};
    transition: width 0.3s ease;
  }
`;
