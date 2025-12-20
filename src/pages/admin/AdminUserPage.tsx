import styled from 'styled-components';
import { useMemo, useState } from 'react';
import SearchIcon from '@/assets/icons/Search.svg?react';
import Close from '@/assets/icons/Close.svg?react';
import { TitleHeader } from '@/components/common/TitleHeader';
import { UserCard } from '@/components/user/UserCard';
import { useAdminGetMembers } from '@/api/admin';

const AdminUserPage = () => {
  const { data } = useAdminGetMembers();

  const [searchTerm, setSearchTerm] = useState('');

  const filteredMembers = useMemo(() => {
    const allMembers = data;

    if (!searchTerm) {
      return allMembers;
    }

    return allMembers?.filter(
      (member) =>
        member.name.includes(searchTerm) || member.email.includes(searchTerm),
    );
  }, [searchTerm]);

  return (
    <Container>
      <TitleHeader
        mainTitle="사용자 관리"
        subTitle="사용자의 공신력을 지정하거나 관리할 수 있습니다"
      />

      <SearchBarWrapper>
        <SearchBar
          placeholder="검색할 이름 또는 이메일을 입력해주세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconWrapper>
          {searchTerm && <Close onClick={() => setSearchTerm('')} />}
          <Search onClick={() => setSearchTerm(searchTerm)} />
        </IconWrapper>
      </SearchBarWrapper>

      <UserCardWrapper>
        {filteredMembers?.map((member) => (
          <UserCard key={member.id} member={member} />
        ))}
      </UserCardWrapper>

      <Guide>
        <span>공신력 사용자:</span> 정확도가 높고 신뢰할 수 있는 제보를 하는
        사용자에게 공신력을 부여하면, 해당 사용자의 제보가 강조 표시됩니다.
      </Guide>
    </Container>
  );
};

export default AdminUserPage;

const Container = styled.div`
  padding: 20px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SearchBarWrapper = styled.div`
  margin-bottom: 24px;
  position: relative;
`;

const SearchBar = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 36px;
  padding: 12px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray50};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.font.fontSize.text14};
  font-weight: ${({ theme }) => theme.font.fontWeight.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 6px;

  position: absolute;
  top: 6px;
  right: 12px;

  svg {
    cursor: pointer;
  }
`;

const Search = styled(SearchIcon)`
  circle,
  path {
    stroke: ${({ theme }) => theme.colors.gray700};
  }
`;

const UserCardWrapper = styled.div`
  display: grid;
  gap: 12px;

  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Guide = styled.div`
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.subBlue};
  border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  border-radius: 12px;

  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: ${({ theme }) => theme.font.fontSize.text14};
  font-weight: ${({ theme }) => theme.font.fontWeight.regular};

  span {
    font-weight: ${({ theme }) => theme.font.fontWeight.bold};
  }
`;
