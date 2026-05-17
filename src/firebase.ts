import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyDsM4hePgL7i58NCZvInHGxB5hbX75Q2bY',
  authDomain: 'safemap-472fd.firebaseapp.com',
  projectId: 'safemap-472fd',
  storageBucket: 'safemap-472fd.firebasestorage.app',
  messagingSenderId: '931327955321',
  appId: '1:931327955321:web:0fa76a03c989d3ff835fa8',
  measurementId: 'G-T6YBR8E44Y',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const handleAllowNotification = async () => {
  try {
    const status = await Notification.requestPermission();

    if (status === 'granted') {
      const registration = await navigator.serviceWorker.register(
        '/firebase-messaging-sw.js',
      );

      const token = await getToken(messaging, {
        vapidKey:
          'BDWqjpTrhAoAsx9cIHta-8DLOCkCL49xCI-W1ygu1Vr7ilj0c1rWewLVRgm2QklK__Of08Wl9WJ7smBL57MqUU4',
        serviceWorkerRegistration: registration,
      });

      if (token) {
        return token;
      }
    }

    return null;
  } catch (error) {
    console.error('FCM 토큰 에러:', error);
    return null;
  }
};
