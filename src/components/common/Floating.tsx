import styled from 'styled-components';
import { Button } from '@/components/common/Button';
import { useMode } from '@/context/ModeContext';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';

export const Floating = () => {
  const { isAdminMode, changeMode } = useMode();
  const { handleNavigate } = useHandleNavigate();

  return (
    <FloatingWrapper>
      <Button
        variant="white"
        width="60px"
        height="40px"
        style={{ fontSize: '14px', fontWeight: '500' }}
        onClick={changeMode}
      >
        {isAdminMode ? '일반' : '관리자'}
      </Button>
      {!isAdminMode && (
        <Button
          variant="red"
          width="100px"
          height="40px"
          style={{ fontSize: '14px', fontWeight: '500' }}
          onClick={() => handleNavigate('/user/report')}
        >
          긴급 제보하기
        </Button>
      )}
    </FloatingWrapper>
  );
};

const FloatingWrapper = styled.div`
  padding: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  bottom: 56px;
  right: 0;
`;
