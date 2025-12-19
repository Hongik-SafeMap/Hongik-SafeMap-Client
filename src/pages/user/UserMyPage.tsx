import styled from 'styled-components';
import { useState } from 'react';
import { TitleHeader } from '@/components/common/TitleHeader';
import { AccountInfo } from '@/components/mypage/AccountInfo';
import { MyReports } from '@/components/mypage/MyReports';
import { PrivacySettings } from '@/components/mypage/PrivacySettings';
import { MY_PAGE_MENU_TABS } from '@/constant/MyPageTabs';

const UserMyPage = () => {
  const [activeTab, setActiveTab] = useState(MY_PAGE_MENU_TABS[0]);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (activeTab) {
      case '내 정보':
        return <AccountInfo />;
      case '민감 정보':
        return <PrivacySettings />;
      case '내 제보':
        return <MyReports />;
      default:
        return <AccountInfo />;
    }
  };

  return (
    <Container>
      <TitleHeader mainTitle="마이페이지" subTitle="내 정보 및 활동 관리" />

      <Tabs>
        {MY_PAGE_MENU_TABS.map((tab) => (
          <Tab
            key={tab}
            active={activeTab === tab}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </Tab>
        ))}
      </Tabs>

      {renderContent()}
    </Container>
  );
};

export default UserMyPage;

const Container = styled.div`
  padding: 20px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Tabs = styled.div`
  padding: 4px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: ${({ theme }) => theme.colors.gray100};
  border-radius: 20px;
`;

const Tab = styled.div<{ active: boolean }>`
  padding: 4px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-align: center;
  border-radius: 20px;
  background: ${({ theme, active }) => (active ? theme.colors.white : '')};
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.font.fontSize.text14};
  font-weight: ${({ theme }) => theme.font.fontWeight.medium};
  transition: 0.3s ease-out;
`;
