import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleAllowNotification } from '@/firebase';

const PROVIDER_MAP: Record<string, '카카오' | '네이버'> = {
  kakao: '카카오',
  naver: '네이버',
};

export const SNSCallbackPage = () => {
  const navigate = useNavigate();

  const pathname = window.location.pathname;
  const provider = pathname.includes('kakao') ? 'kakao' : 'naver';

  const params = new URLSearchParams(window.location.search);
  const code = params.get('code') || '';

  const hasRequested = useRef(false);

  useEffect(() => {
    const login = async () => {
      if (!code || hasRequested.current) return;

      try {
        hasRequested.current = true;
        let accessToken = '';

        if (provider === 'kakao') {
          const tokenParams = new URLSearchParams();
          tokenParams.append('grant_type', 'authorization_code');
          tokenParams.append(
            'client_id',
            import.meta.env.VITE_APP_KAKAO_CLIENT_ID,
          );
          tokenParams.append(
            'redirect_uri',
            import.meta.env.VITE_KAKAO_REDIRECT_URI,
          );
          // tokenParams.append(
          //   'client_secret',
          //   import.meta.env.VITE_KAKAO_CLIENT_SECRET,
          // );
          tokenParams.append('code', code);

          const res = await axios.post(
            'https://kauth.kakao.com/oauth/token',
            tokenParams,
            {
              headers: {
                'Content-type':
                  'application/x-www-form-urlencoded;charset=utf-8',
              },
            },
          );
          accessToken = res.data.access_token;
        } else if (provider === 'naver') {
          const res = await axios.get('/naver-api/oauth2.0/token', {
            params: {
              grant_type: 'authorization_code',
              client_id: import.meta.env.VITE_APP_NAVER_CLIENT_ID,
              client_secret: import.meta.env.VITE_NAVER_CLIENT_SECRET,
              code: code,
              state: 'RE_STATE_1234',
            },
          });
          accessToken = res.data.access_token;
        }

        if (!accessToken) throw new Error('인증 토큰 획득 실패');

        const fcmToken = (await handleAllowNotification()) || '';
        const loginRequest = {
          token: accessToken,
          loginType: PROVIDER_MAP[provider],
          fcmToken,
        };

        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/auth/login/sns`,
          loginRequest,
        );

        const { accessToken: serviceJwt, refreshToken, status } = response.data;
        localStorage.setItem('accessToken', serviceJwt);
        localStorage.setItem('refreshToken', refreshToken);

        if (status === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      } catch (error: any) {
        console.error(
          '소셜 로그인 에러 상세:',
          error.response?.data || error.message,
        );
        alert('소셜 로그인에 실패했습니다.');
        navigate('/login');
      }
    };

    login();
  }, [code, navigate]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>소셜 로그인 중...</div>
    </div>
  );
};
