import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ADMIN_TABS, USER_TABS } from '@/constant/TabItems';

export const UserTabBar = () => {
  return (
    <TabBarWrapper>
      {USER_TABS.map((tab) => (
        <TabItem key={tab.key} to={tab.path} end={tab.end}>
          <span>{tab.label}</span>
        </TabItem>
      ))}
    </TabBarWrapper>
  );
};

export const AdminTabBar = () => {
  return (
    <TabBarWrapper>
      {ADMIN_TABS.map((tab) => (
        <TabItem key={tab.key} to={tab.path} end={tab.end}>
          <span>{tab.label}</span>
        </TabItem>
      ))}
    </TabBarWrapper>
  );
};

const TabBarWrapper = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-bewtween;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.gray100};
  background: ${({ theme }) => theme.colors.white};

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const TabItem = styled(NavLink)`
  width: 20%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray200};

  span {
    font-size: ${({ theme }) => theme.font.fontSize.text14};
    font-weight: ${({ theme }) => theme.font.fontWeight.semibold};
  }

  &.active {
    color: ${({ theme }) => theme.colors.mainBlue};
  }
`;
