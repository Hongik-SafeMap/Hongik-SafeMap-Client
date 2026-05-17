import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import ModalClose from '@/assets/icons/Exit.svg?react';
import { InputBox } from '@/components/common/InputBox';
import { useAdminPrivacyPolicy, useAdminTerms } from '@/api/term';
import { Dropdown } from '@/components/common/Dropdown';
import { formatDashDate } from '@/utils/formatDate';
// import { Pagination } from '@/components/common/Pagination';

interface ModalAllTermProps {
  onClose: () => void;
  type: string;
}

export const ModalAllTerm = ({ onClose, type }: ModalAllTermProps) => {
  const [selectedVersion, setSelectedVersion] = useState<string>('');

  const { data: terms } = useAdminTerms({ page: 0, size: 50 });
  const { data: privacy } = useAdminPrivacyPolicy({ page: 0, size: 50 });

  const list = type === '이용약관' ? terms?.terms : privacy?.policies;
  const versionOptions = useMemo(() => {
    if (!list) return [];

    return list.map((term) => ({
      option: `v${term?.version} (${formatDashDate(term?.createdAt ?? '')} 업데이트)`,
      value: term.version,
    }));
  }, [list]);

  const selectedTerm = useMemo(
    () => list?.find((t) => t.version === selectedVersion) || list?.[0],
    [list, selectedVersion],
  );

  useEffect(() => {
    if (list?.[0] && !selectedVersion) {
      setSelectedVersion(list[0].version);
    }
  }, [list, selectedVersion]);

  /* 페이지네이션
  const [currentPage, setCurrentPage] = useState(0);

  const { data: terms } = useAdminTerms({ page: currentPage, size: 10 });
  const { data: privacy } = useAdminPrivacyPolicy({
    page: currentPage,
    size: 10,
  });

  const data = type === '이용약관' ? terms : privacy;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  */

  return (
    <ModalWrapper>
      <div className="top">
        <div>{type} 조항 내역</div>
        <ModalClose onClick={onClose} />
      </div>

      <Dropdown
        title="버전 선택"
        options={versionOptions}
        selectedOption={selectedVersion}
        setSelectedOption={setSelectedVersion}
      />

      <TermWrapper>
        <div className="inputs">
          <InputBox title="제목" value={selectedTerm?.title} />
          <InputBox title="버전" value={selectedTerm?.version} />
        </div>

        {selectedTerm?.sections.map((section) => (
          <TermSection key={section.id}>
            <div className="header">{section.header}</div>
            <Content>{section.content}</Content>
          </TermSection>
        ))}
      </TermWrapper>

      {/* {data && data.totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={data.totalPages}
          onPageChange={handlePageChange}
          isFirst={currentPage === 0}
          isLast={currentPage === data.totalPages - 1}
          padding="12px 0px 0px 0px"
        />
      )} */}
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  padding: 20px;
  width: 600px;
  max-height: 75vh;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    color: ${({ theme }) => theme.colors.gray1000};
    font-size: ${({ theme }) => theme.font.fontSize.title24};
    font-weight: ${({ theme }) => theme.font.fontWeight.bold};
  }

  .inputs {
    width: 100%;
    display: flex;
    gap: 16px;

    & > div {
      flex: 1;
    }

    & > input {
      border: none;
    }
  }

  svg {
    cursor: pointer;
  }
`;

const TermWrapper = styled.div`
  padding-right: 4px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;

  /* 1. 전체 스크롤바 너비 */
  &::-webkit-scrollbar {
    width: 12px;
  }

  /* 2. 스크롤바 트랙 (바탕) */
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* 3. 스크롤바 막대 (움직이는 부분) */
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray500};
    border-radius: 12px;
    border: 4px solid ${({ theme }) => theme.colors.white};
  }

  & {
    scrollbar-gutter: stable; /* 스크롤바가 생겨도 본문이 밀리지 않게 고정 (최신 브라우저) */
  }
`;

const TermSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: ${({ theme }) => theme.colors.white};

  .header {
    color: ${({ theme }) => theme.colors.gray1000};
    font-size: ${({ theme }) => theme.font.fontSize.body16};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
  }
`;

const Content = styled.div`
  padding: 10px 16px;
  max-height: 80px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray200};

  color: ${({ theme }) => theme.colors.gray1000};
  font-size: ${({ theme }) => theme.font.fontSize.body16};
  font-weight: ${({ theme }) => theme.font.fontWeight.medium};

  /* 1. 전체 스크롤바 너비 */
  &::-webkit-scrollbar {
    width: 12px;
  }

  /* 2. 스크롤바 트랙 (바탕) */
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* 3. 스크롤바 막대 (움직이는 부분) */
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray500};
    border-radius: 12px;
    border: 4px solid ${({ theme }) => theme.colors.gray300};
  }

  & {
    scrollbar-gutter: stable; /* 스크롤바가 생겨도 본문이 밀리지 않게 고정 (최신 브라우저) */
  }
`;
