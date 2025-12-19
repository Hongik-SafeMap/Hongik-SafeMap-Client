import styled from 'styled-components';

interface StatusCardProps {
  title: string;
  status: string;
  count: number;
}

export const StatusCard = ({ title, status, count }: StatusCardProps) => {
  return (
    <Container>
      <div className="top">
        <div>{title}</div>
        <div className="status">{status}</div>
      </div>
      <div className="count">{count}</div>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: 16px;

  .top {
    display: flex;
    flex-direction: column;
    gap: 4px;

    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.font.fontSize.text16};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
  }

  .status {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.font.fontSize.text14};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
  }

  .count {
    display: flex;
    align-items: end;

    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.font.fontSize.text24};
    font-weight: ${({ theme }) => theme.font.fontWeight.bold};
    line-height: 100%;
  }
`;
