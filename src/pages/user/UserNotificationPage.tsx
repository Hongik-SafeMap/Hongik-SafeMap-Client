import styled from 'styled-components';
import { useEffect } from 'react';
import Back from '@/assets/icons/ChevronLeft.svg?react';
import Notification from '@/assets/icons/NotificationS.svg?react';
import {
  useNotifications,
  useUpdateNotificationRead,
} from '@/api/notification';
import { NavBar } from '@/components/common/NavBar';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { formatRelativeTime } from '@/utils/formatDate';

export const UserNotificationPage = () => {
  const { handleGoBack } = useHandleNavigate();

  const { data } = useNotifications();

  const { mutate: read } = useUpdateNotificationRead();

  useEffect(() => {
    return () => {
      const hasUnread = data?.notifications.some(
        (notification) => !notification.isRead,
      );
      if (hasUnread) {
        read();
      }
    };
  }, [data, read]);

  return (
    <Container>
      <NavBar
        left={<Back onClick={handleGoBack} />}
        center={<NavCenter>알림</NavCenter>}
      />

      {data?.notifications.map((notification) => (
        <NotificationWrapper key={notification.id} isRead={notification.isRead}>
          <Notification />
          <div className="notification">
            <div className="title">{notification.title}</div>
            <div className="content">{notification.content}</div>
            <div className="date">
              {formatRelativeTime(notification.createdAt)}
            </div>
          </div>
        </NotificationWrapper>
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin: 60px 0px 20px 0px;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray1000};
  font-size: ${({ theme }) => theme.font.fontSize.title20};
  font-weight: ${({ theme }) => theme.font.fontWeight.bold};
`;

const NotificationWrapper = styled.div<{ isRead: boolean }>`
  padding: 16px 20px;
  display: flex;
  gap: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};

  color: ${({ theme, isRead }) =>
    isRead ? theme.colors.gray600 : theme.colors.gray800};
  font-size: ${({ theme }) => theme.font.fontSize.body14};
  font-weight: ${({ theme }) => theme.font.fontWeight.medium};

  .notification {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .title {
    color: ${({ theme, isRead }) =>
      isRead ? theme.colors.gray700 : theme.colors.gray1000};
    font-size: ${({ theme }) => theme.font.fontSize.body16};
    font-weight: ${({ theme }) => theme.font.fontWeight.bold};
  }

  .date {
    margin-top: 4px;
  }
`;
