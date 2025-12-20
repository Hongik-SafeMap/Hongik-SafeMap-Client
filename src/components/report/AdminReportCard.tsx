import styled from 'styled-components';
import { Tag } from '@/components/common/Tag';
import type { AdminReportContent } from '@/types/Report';

interface AdminReportCardProps {
  report: AdminReportContent;
}

export const AdminReportCard = ({ report }: AdminReportCardProps) => {
  return (
    <Container>
      <div className="top">
        <div className="number">제보 #{report.reportId}</div>
        <Tag variant="red">재난종류</Tag>
      </div>

      <div className="title">산사태로 인해 도로가 차단되었습니다.</div>

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
    gap: 8px;
    align-items: center;

    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.font.fontSize.text20};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
  }

  .title {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.font.fontSize.text16};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
  }
`;

// const ReviewWrapper = styled.div`
//   margin-top: 12px;
//   padding: 8px 12px;
//   display: flex;
//   justify-content: space-between;
//   background: ${({ theme }) => theme.colors.gray50};
//   border-radius: 8px;

//   .review {
//     width: 100%;
//     display: flex;
//     flex-direction: column;
//     gap: 4px;
//   }

//   .option {
//     color: ${({ theme }) => theme.colors.gray500};
//     font-size: ${({ theme }) => theme.font.fontSize.text12};
//     font-weight: ${({ theme }) => theme.font.fontWeight.medium};
//   }

//   .count {
//     color: ${({ theme }) => theme.colors.gray900};
//     font-size: ${({ theme }) => theme.font.fontSize.text16};
//     font-weight: ${({ theme }) => theme.font.fontWeight.medium};
//   }
// `;
