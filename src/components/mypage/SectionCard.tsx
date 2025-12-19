import styled from 'styled-components';
import type React from 'react';

interface SectionCardProps {
  title: string;
  detail: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}

export const SectionCard = ({
  title,
  detail,
  right,
  children,
}: SectionCardProps) => {
  return (
    <Container>
      <div className="top">
        <div className="left">
          <div className="title">{title}</div>
          <div className="detail">{detail}</div>
        </div>
        {right && <div className="right">{right}</div>}
      </div>
      {children}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: 12px;

  .top {
    display: flex;
    justify-content: space-between;
  }

  .left {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.font.fontSize.text16};
    font-weight: ${({ theme }) => theme.font.fontWeight.bold};
  }

  .detail {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.font.fontSize.text14};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
  }
`;
