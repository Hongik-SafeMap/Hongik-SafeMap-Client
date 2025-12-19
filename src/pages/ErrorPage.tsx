import { styled } from 'styled-components';
import { Button } from '@/components/common/Button';

const ErrorPage = () => {
  const handleGoBackAndReload = () => {
    window.history.back();

    const onPopState = () => {
      window.location.reload();
      window.removeEventListener('popstate', onPopState);
    };

    window.addEventListener('popstate', onPopState);
  };

  return (
    <Container>
      <Labels>
        <div className="title">페이지를 찾을 수 없습니다</div>
        <div className="detail">
          존재하지 않는 주소를 입력하셨거나,
          <br />
          요청하신 페이지의 주소가 변경되어 찾을 수 없습니다.
        </div>
      </Labels>

      <Button
        variant="mainBlue"
        width="50%"
        height="52px"
        onClick={handleGoBackAndReload}
      >
        이전 화면으로
      </Button>
    </Container>
  );
};

export default ErrorPage;

const Container = styled.div`
  padding: 0px 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 80px;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: ${({ theme }) => theme.colors.gray50};
`;

const Labels = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.font.fontSize.text20};
    font-weight: ${({ theme }) => theme.font.fontWeight.bold};
  }

  .detail {
    color: ${({ theme }) => theme.colors.gray500};
    font-size: ${({ theme }) => theme.font.fontSize.text14};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
  }
`;
