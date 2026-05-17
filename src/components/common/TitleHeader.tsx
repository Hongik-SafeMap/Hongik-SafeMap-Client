import styled from 'styled-components';
import Logo from '@/assets/icons/LogoHome.svg?react';
import My from '@/assets/icons/My.svg?react';
import Notification from '@/assets/icons/Notification.svg?react';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import { useNotificationUnread } from '@/api/notification';

interface TitleMainSubProps {
  main: string;
  sub: string;
  align?: string;
}

export const TitleMainSub = ({
  main,
  sub,
  align = 'flex-start',
}: TitleMainSubProps) => {
  return (
    <Title align={align}>
      <div className="main">{main}</div>
      <div className="sub">{sub}</div>
    </Title>
  );
};

const Title = styled.div<{ align: string }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => align};
  gap: 2px;

  .main {
    color: ${({ theme }) => theme.colors.gray1000};
    font-size: ${({ theme }) => theme.font.fontSize.body14};
    font-weight: ${({ theme }) => theme.font.fontWeight.bold};
  }

  .sub {
    color: ${({ theme }) => theme.colors.gray1000};
    font-size: ${({ theme }) => theme.font.fontSize.detail12};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
  }
`;

interface TitleHeaderProps {
  mainTitle: string;
  subTitle: string;
  home?: boolean;
}

export const TitleHeader = ({
  home = false,
  mainTitle,
  subTitle,
}: TitleHeaderProps) => {
  const { handleNavigate } = useHandleNavigate();

  const { data } = useNotificationUnread();

  return (
    <TitleHeaderWrapper>
      {home ? <Logo /> : <TitleMainSub main={mainTitle} sub={subTitle} />}

      <div className="icons">
        <div
          className="notification"
          onClick={() => handleNavigate('/user/notification')}
        >
          <Notification />
          {data > 0 && (
            <Count isSingleDigit={data > 0 && data < 10}>
              {data > 99 ? '99+' : data}
            </Count>
          )}
        </div>

        <My onClick={() => handleNavigate('/user/my')} />
      </div>
    </TitleHeaderWrapper>
  );
};

const TitleHeaderWrapper = styled.div`
  padding: 0px 20px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  .icons {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .notification {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const Count = styled.div<{ isSingleDigit: boolean }>`
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.red600};
  position: absolute;

  ${({ isSingleDigit }) =>
    isSingleDigit
      ? `
        width: 16px;
        padding: 0px;
        border-radius: 50%;
        top: 0px;
        right: 0px;
      `
      : `
        padding: 0px 6px;
        border-radius: 8px;
        top: 0px;
        right: -4px;
      `}

  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.font.fontSize.detail10};
  font-weight: ${({ theme }) => theme.font.fontWeight.medium};
`;
