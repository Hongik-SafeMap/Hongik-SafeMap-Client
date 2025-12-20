import styled from 'styled-components';
import { TitleHeader } from '@/components/common/TitleHeader';
import { AdminReportCard } from '@/components/report/AdminReportCard';
import { useAdminGetReports } from '@/api/admin';
import type { PageableRequest } from '@/types/Pageable';

const AdminReportPage = () => {
  const pageable: PageableRequest = {
    page: 0,
    size: 100,
    sort: [],
  };

  const { data } = useAdminGetReports(pageable);

  return (
    <Container>
      <TitleHeader
        mainTitle="제보 검토"
        subTitle="제보를 검토하고 조치할 수 있습니다"
      />

      {data?.content.map((report) => (
        <AdminReportCard report={report} />
      ))}
    </Container>
  );
};

export default AdminReportPage;

const Container = styled.div`
  padding: 20px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
