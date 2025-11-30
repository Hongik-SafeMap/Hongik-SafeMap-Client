import { Route, Routes } from 'react-router-dom';
import SplashPage from '@/pages/login/SplashPage';
import LoginPage from '@/pages/login/LoginPage';
import SignupPage from '@/pages/signup/SignupPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
