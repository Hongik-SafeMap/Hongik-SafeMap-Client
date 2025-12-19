import { Route, Routes } from 'react-router-dom';
import SplashPage from '@/pages/login/SplashPage';
import LoginPage from '@/pages/login/LoginPage';
import SignupPage from '@/pages/signup/SignupPage';
import ErrorPage from '@/pages/ErrorPage';
import UserRoute from '@/route/UserRoute';
import AdminRoute from '@/route/AdminRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/user/*" element={<UserRoute />} />

      <Route path="/admin/*" element={<AdminRoute />} />

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
