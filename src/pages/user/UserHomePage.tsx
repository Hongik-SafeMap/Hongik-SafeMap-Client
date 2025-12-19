import styled from 'styled-components';
import { TitleHeader } from '@/components/common/TitleHeader';

const UserHomePage = () => {
  return (
    <Container>
      <TitleHeader mainTitle="실시간 지도" subTitle="실시간 재난 현황 지도" />
    </Container>
  );
};

export default UserHomePage;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
