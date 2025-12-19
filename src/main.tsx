import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from '@/style/GlobalStyle.tsx';
import { theme } from '@/style/theme.tsx';
import App from '@/App.tsx';
import { ModeProvider } from '@/context/ModeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <ModeProvider>
          <App />
        </ModeProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
