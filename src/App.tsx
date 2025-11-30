import { Route, Routes } from 'react-router-dom';
import SplashPage from '@/pages/login/SplashPage';
import { OnboardingPage } from '@/pages/login/OnboardingPage';
import SignupPage from '@/pages/signup/SignupPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
