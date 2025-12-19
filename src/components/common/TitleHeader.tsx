import styled from 'styled-components';

interface TitleHeaderProps {
  mainTitle: string;
  subTitle: string;
  right?: React.ReactNode;
}

export const TitleHeader = ({
  mainTitle,
  subTitle,
  right,
}: TitleHeaderProps) => {
  return (
    <TitleHeaderWrapper>
      <TitleHeaderLeft>
        <div className="main">{mainTitle}</div>
        <div className="sub">{subTitle}</div>
      </TitleHeaderLeft>
      <TitleHeaderRight>{right}</TitleHeaderRight>
    </TitleHeaderWrapper>
  );
};

const TitleHeaderWrapper = styled.div`
  background: ${({ theme }) => theme.colors.white};
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleHeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: flex-start;

  .main {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.font.fontSize.text20};
    font-weight: ${({ theme }) => theme.font.fontWeight.bold};
  }

  .sub {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.font.fontSize.text14};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
  }
`;

const TitleHeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;
