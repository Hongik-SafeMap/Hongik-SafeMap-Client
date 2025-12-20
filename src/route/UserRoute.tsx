import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import Alert from '@/assets/icons/Alert.svg?react';
import { UserTabBar } from '@/components/common/TabBar';
import UserHomePage from '@/pages/user/UserHomePage';
import UserReportPage from '@/pages/user/UserReportPage';
import UserGuidePage from '@/pages/user/UserGuidePage';
import UserGuideDetailPage from '@/pages/user/UserGuideDetailPage';
import UserMyPage from '@/pages/user/UserMyPage';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';

const UserRoute = () => {
  const { handleNavigate } = useHandleNavigate();

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <main>
        <Routes>
          <Route index element={<UserHomePage />} />
          <Route path="report" element={<UserReportPage />} />
          <Route path="guide" element={<UserGuidePage />} />
          <Route path="guide/:id" element={<UserGuideDetailPage />} />
          <Route path="my" element={<UserMyPage />} />
        </Routes>
      </main>

      <ReportButton onClick={() => handleNavigate('/user/report')}>
        <Alert />
        긴급 제보하기
      </ReportButton>

      <UserTabBar />
    </div>
  );
};

export default UserRoute;

const ReportButton = styled.div`
  padding: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.mainRed};
  border-radius: 12px;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font.fontSize.text16};
  font-weight: ${({ theme }) => theme.font.fontWeight.medium};

  position: fixed;
  bottom: 64px;
  right: 8px;
`;
