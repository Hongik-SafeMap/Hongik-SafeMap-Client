import { Route, Routes } from 'react-router-dom';
import { Floating } from '@/components/common/Floating';
import { AdminTabBar } from '@/components/common/TabBar';
import AdminHomePage from '@/pages/admin/AdminHomePage';
import AdminReportPage from '@/pages/admin/AdminReportPage';
import AdminUserPage from '@/pages/admin/AdminUserPage';

const AdminRoute = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Floating />

      <main>
        <Routes>
          <Route index element={<AdminHomePage />} />
          <Route path="reports" element={<AdminReportPage />} />
          <Route path="users" element={<AdminUserPage />} />
        </Routes>
      </main>

      <AdminTabBar />
    </div>
  );
};

export default AdminRoute;
