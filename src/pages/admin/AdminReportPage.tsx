import styled from 'styled-components';
import { TitleHeader } from '@/components/common/TitleHeader';
import { AdminReportCard } from '@/components/report/AdminReportCard';

const AdminReportPage = () => {
  return (
    <Container>
      <TitleHeader
        mainTitle="제보 검토"
        subTitle="제보를 검토하고 조치할 수 있습니다"
      />

      <AdminReportCard />
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
