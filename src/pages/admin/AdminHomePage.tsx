import styled from 'styled-components';
import { TitleHeader } from '@/components/common/TitleHeader';
import { StatusCard } from '@/components/dashboard/StatusCard';

const AdminHomePage = () => {
  return (
    <Container>
      <TitleHeader
        mainTitle="시스템 현황"
        subTitle="전체 제보 및 사용자 관리 현황을 확인할 수 있습니다"
      />

      <StatusWrapper>
        <StatusCard title="총 제보 수" status="총 5명 중" count={0} />
        <StatusCard title="총 사용자" status="전체 등록된 사용자" count={0} />
        <StatusCard title="공신력 사용자" status="전체 등록된 제보" count={0} />
      </StatusWrapper>
    </Container>
  );
};

export default AdminHomePage;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StatusWrapper = styled.div`
  display: grid;
  gap: 12px;

  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
