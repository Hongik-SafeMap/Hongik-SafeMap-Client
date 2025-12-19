import styled from 'styled-components';
import { Tag } from '@/components/common/Tag';

export const UserReportCard = () => {
  return (
    <Container>
      <div className="top">
        <div className="tag">
          <Tag variant="black">재난종류</Tag>
          <Tag variant="red">신뢰도 의심</Tag>
          <Tag variant="white">검증됨</Tag>
        </div>
        <div className="date">2025.12.18. 오후 12:29</div>
      </div>
      <div className="title">산사태로 인해 도로가 차단되었습니다.</div>
      <div className="border" />
      <ReviewWrapper>
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
      </ReviewWrapper>
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

const ReviewWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  .review {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .option {
    color: ${({ theme }) => theme.colors.gray400};
    font-size: ${({ theme }) => theme.font.fontSize.text14};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
  }

  .count {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.font.fontSize.text14};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
  }
`;
