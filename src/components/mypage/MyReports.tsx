import styled from 'styled-components';
import { SectionCard } from '@/components/mypage/SectionCard';
import { UserReportCard } from '@/components/report/UserReportCard';

export const MyReports = () => {
  return (
    <Container>
      <SectionCard title="내가 제보한 글" detail="총 n개의 제보">
        <UserReportCard />
      </SectionCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
