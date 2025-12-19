import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArrowLeft from '@/assets/icons/ArrowLeft.svg?react';
import { NavBar } from '@/components/common/NavBar';
import { WarningSection } from '@/components/guide/WarningSection';
import { SuppliesSection } from '@/components/guide/SuppliesSection';
import { ActionSection } from '@/components/guide/ActionSection';
import { mockGuides } from '@/data/Guide';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import type { GuideItem } from '@/types/Guide';

const UserGuideDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { handleGoBack } = useHandleNavigate();

  const [guide, setGuide] = useState<GuideItem>();

  useEffect(() => {
    if (id) setGuide(mockGuides.find((item) => item.id === id));
  }, []);

  return (
    <Container>
      <NavBar
        left={<ArrowLeft onClick={handleGoBack} />}
        center={<NavCenter>{guide?.category}</NavCenter>}
      />
      <SectionWrapper>
        <div>{guide?.title}</div>
        <div className="detail">{guide?.detail}</div>
      </SectionWrapper>
      <ActionSection guides={guide?.actions} />
      <SuppliesSection supplies={guide?.supplies} />
      <WarningSection warnings={guide?.warnings} />
    </Container>
  );
};

export default UserGuideDetailPage;

const Container = styled.div`
  padding: 0px 20px 80px 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const NavCenter = styled.div`
  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.font.fontSize.text16};
  font-weight: ${({ theme }) => theme.font.fontWeight.semibold};
`;

const SectionWrapper = styled.div`
  margin-top: -20px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.font.fontSize.text16};
  font-weight: ${({ theme }) => theme.font.fontWeight.semibold};

  .detail {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.font.fontSize.text14};
    font-weight: ${({ theme }) => theme.font.fontWeight.semibold};
  }
`;
