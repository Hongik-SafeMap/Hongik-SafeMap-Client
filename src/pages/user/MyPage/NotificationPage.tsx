import styled from 'styled-components';
import Exit from '@/assets/icons/Exit.svg?react';
import Alarm from '@/assets/icons/NotificationS.svg?react';
import {
  useNotificationPreference,
  useUpdateNotification,
} from '@/api/notification';
import { NavBar } from '@/components/common/NavBar';
import { Toggle } from '@/components/common/Toggle';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { handleAllowNotification } from '@/firebase';

export const NotificationPage = () => {
  const { handleGoBack } = useHandleNavigate();

  const { data: notifications = [] } = useNotificationPreference();
  const { mutate: updateNotification } = useUpdateNotification();

  const isAgreedNoti = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      alert('이 브라우저는 알림 기능을 지원하지 않습니다.');
      return false;
    }

    if (Notification.permission === 'denied') {
      alert('브라우저 설정에서 알림 권한을 허용으로 변경해주세요.');
      return false;
    }

    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        alert('알림 권한이 허용되지 않았습니다.');
        return false;
      }
    }

    try {
      await handleAllowNotification();
      return true;
    } catch (error) {
      console.error('FCM 토큰 획득 실패 (시연을 위해 패스):', error);
      return true;
    }
  };

  const isAllEnabled =
    notifications.length > 0 && notifications.every((n) => n.isEnabled);

  const handleToggleAll = async () => {
    const nextStatus = !isAllEnabled;

    if (nextStatus) {
      const hasPermission = await isAgreedNoti();
      if (!hasPermission) return;
    }

    notifications.forEach((notification) => {
      if (notification.isEnabled !== nextStatus) {
        updateNotification({
          disasterTypeId: notification.disasterTypeId,
          isEnabled: nextStatus,
        });
      }
    });
  };

  const handleToggle = async (id: number, currentStatus: boolean) => {
    if (!currentStatus) {
      const hasPermission = await isAgreedNoti();
      if (!hasPermission) return;
    }

    updateNotification({
      disasterTypeId: id,
      isEnabled: !currentStatus,
    });
  };

  return (
    <Container>
      <NavBar
        center={<NavCenter>재난 알림 설정</NavCenter>}
        right={<Exit onClick={handleGoBack} />}
      />

      <Section>
        <div className="left">
          <Alarm />
          <span>전체 알림</span>
        </div>
        <Toggle checked={isAllEnabled} onChange={handleToggleAll} />
      </Section>
      <Border />

      {notifications?.map((notification) => (
        <div key={notification.disasterTypeId}>
          <Section>
            <div className="left">
              <img src={notification.iconUrl} />
              <span>{notification.disasterTypeName} 알림</span>
            </div>
            <Toggle
              checked={notification.isEnabled}
              onChange={() =>
                handleToggle(
                  notification.disasterTypeId,
                  notification.isEnabled,
                )
              }
            />
          </Section>
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin: 76px 20px 20px 20px;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray1000};
  font-size: ${({ theme }) => theme.font.fontSize.title20};
  font-weight: ${({ theme }) => theme.font.fontWeight.bold};
`;

const Section = styled.div`
  padding: 8px 0px 16px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: ${({ theme }) => theme.colors.gray1000};
  font-size: ${({ theme }) => theme.font.fontSize.body18};
  font-weight: ${({ theme }) => theme.font.fontWeight.medium};

  .left {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  span {
    padding-top: 2px;
  }

  img {
    width: 24px;
    height: 24px;
  }
`;

const Border = styled.div<{ isDark?: boolean }>`
  height: 1px;
  background: ${({ theme }) => theme.colors.gray400};
`;
