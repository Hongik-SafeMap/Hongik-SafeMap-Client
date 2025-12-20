import styled from 'styled-components';
import Alert from '@/assets/icons/AlertSmall.svg?react';
import Check from '@/assets/icons/CheckSmall.svg?react';
import { Tag } from '@/components/common/Tag';
import { formatDateTime } from '@/utils/formatDate';
import type { ReportContent } from '@/types/Report';

interface UserReportCardProps {
  report: ReportContent;
}

export const UserReportCard = ({ report }: UserReportCardProps) => {
  return (
    <Container>
      <div className="tag">
        <Tag variant="black">{report.disasterType}</Tag>
        {report.status === '허위정보' && (
          <Tag
            variant="red"
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Alert />
            신뢰도 의심
          </Tag>
        )}
        {report.status === '승인' && (
          <Tag
            variant="white"
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Check />
            검증됨
          </Tag>
        )}
      </div>
      <div className="title">{report.disasterDescription}</div>
      <div className="top">
        <div className="date">{report.address}</div>
        <div className="date">{formatDateTime(report.createdAt)}</div>
      </div>

      {/* <div className="border" /> */}

      {/* <ReviewWrapper>
        <div className="review">
          <div className="option">도움됨</div>
          <div className="count">30</div>
        </div>
        <div className="review">
          <div className="option">도움 안됨</div>
          <div className="count">1</div>
        </div>
        <div className="review">
          <div className="option">정확</div>
          <div className="count">25</div>
        </div>
        <div className="review">
          <div className="option">허위</div>
          <div className="count">0</div>
        </div>
      </ReviewWrapper> */}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: 12px;

  .top {
    display: flex;
    justify-content: space-between;
  }

  .date {
    color: ${({ theme }) => theme.colors.gray600};
    font-size: ${({ theme }) => theme.font.fontSize.text14};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
  }

  .tag {
    display: flex;
    gap: 8px;
  }

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.font.fontSize.text16};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
  }

  .border {
    height: 1px;
    background: ${({ theme }) => theme.colors.gray100};
  }
`;

// const ReviewWrapper = styled.div`
//   display: flex;
//   justify-content: space-between;

//   .review {
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     gap: 4px;
//   }

//   .option {
//     color: ${({ theme }) => theme.colors.gray400};
//     font-size: ${({ theme }) => theme.font.fontSize.text14};
//     font-weight: ${({ theme }) => theme.font.fontWeight.medium};
//   }

//   .count {
//     color: ${({ theme }) => theme.colors.gray900};
//     font-size: ${({ theme }) => theme.font.fontSize.text14};
//     font-weight: ${({ theme }) => theme.font.fontWeight.medium};
//   }
// `;
