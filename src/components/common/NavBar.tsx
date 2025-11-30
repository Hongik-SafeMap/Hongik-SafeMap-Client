import styled from 'styled-components';

interface NavbarProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export const NavBar = ({ left, center, right }: NavbarProps) => {
  return (
    <NavbarWrapper>
      <NavLeft>{left}</NavLeft>
      <NavCenter>{center}</NavCenter>
      <NavRight>{right}</NavRight>
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled.div`
  background: ${({ theme }) => theme.colors.white};
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
`;

const NavLeft = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

const NavCenter = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const NavRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;
