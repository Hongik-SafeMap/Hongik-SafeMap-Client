import styled from 'styled-components';
import { ActionCard } from '@/components/guide/ActionCard';
import type { Actions } from '@/types/Guide';

interface ActionSectionProps {
  guides: Actions[] | undefined;
}

export const ActionSection = ({ guides }: ActionSectionProps) => {
  if (!guides || guides.length === 0) {
    return null;
  }

  return (
    <SectionWrapper>
      <div className="section">행동 요령</div>
      {guides?.map((guide, index) => (
        <ActionCard key={index} index={index} guide={guide} />
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
`;
