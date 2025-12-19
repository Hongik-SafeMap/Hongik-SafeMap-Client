import { Route, Routes } from 'react-router-dom';
import { Floating } from '@/components/common/Floating';
import { UserTabBar } from '@/components/common/TabBar';
import UserHomePage from '@/pages/user/UserHomePage';
import UserReportPage from '@/pages/user/UserReportPage';
import UserGuidePage from '@/pages/user/UserGuidePage';
import UserGuideDetailPage from '@/pages/user/UserGuideDetailPage';
import UserMyPage from '@/pages/user/UserMyPage';

const UserRoute = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Floating />

      <main>
        <Routes>
          <Route index element={<UserHomePage />} />
          <Route path="report" element={<UserReportPage />} />
          <Route path="guide" element={<UserGuidePage />} />
          <Route path="guide/:id" element={<UserGuideDetailPage />} />
          <Route path="my" element={<UserMyPage />} />
        </Routes>
      </main>

      <UserTabBar />
    </div>
  );
};

export default UserRoute;
