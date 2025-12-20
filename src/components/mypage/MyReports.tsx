import styled from 'styled-components';
import { SectionCard } from '@/components/mypage/SectionCard';
import { UserReportCard } from '@/components/report/UserReportCard';
import { useGetMyReports } from '@/api/mypage';
import type { PageableRequest } from '@/types/Pageable';

export const MyReports = () => {
  const pageable: PageableRequest = {
    page: 0,
    size: 100,
    sort: [],
  };

  const { data } = useGetMyReports(pageable);

  return (
    <Container>
      <SectionCard
        title="내가 제보한 글"
        detail={`총 ${data?.totalElements ?? 0}개의 제보`}
      >
        {data?.content.map((report) => (
          <UserReportCard key={report.id} report={report} />
        ))}
      </SectionCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
