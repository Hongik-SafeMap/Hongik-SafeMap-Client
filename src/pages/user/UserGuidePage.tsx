import styled from 'styled-components';
import { useMemo, useState } from 'react';
import Search from '@/assets/icons/Search.svg?react';
import Close from '@/assets/icons/Close.svg?react';
import Star from '@/assets/icons/Star.svg?react';
import StarFilled from '@/assets/icons/StarFilled.svg?react';
import { TitleHeader } from '@/components/common/TitleHeader';
import { GuideCard } from '@/components/guide/GuideCard';
import { mockGuides } from '@/data/Guide';
import { Button } from '@/components/common/Button';

const UserGuidePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    );
  };

  const filteredGuides = useMemo(() => {
    let guides = mockGuides;

    if (showFavoritesOnly) {
      guides = guides.filter((guide) => favorites.includes(guide.id));
    }

    if (searchTerm) {
      guides = guides?.filter(
        (guide) =>
          guide.title.includes(searchTerm) || guide.detail.includes(searchTerm),
      );
    }

    return guides;
  }, [searchTerm, showFavoritesOnly, mockGuides]);

  return (
    <Container>
      <TitleHeader
        mainTitle="유형별 행동 요령"
        subTitle="재난 상황에서 안전을 지키는 필수 행동 지침"
      />

      <SearchBarWrapper>
        <div className="search">
          <SearchBar
            placeholder="검색할 이름을 입력해주세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="icon">
            {searchTerm && <Close onClick={() => setSearchTerm('')} />}
            <Search onClick={() => setSearchTerm(searchTerm)} />
          </div>
        </div>
        <Button
          width="36px"
          height="36px"
          variant="white"
          style={{
            fontWeight: '500',
            fontSize: '14px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        >
          {showFavoritesOnly ? <StarFilled /> : <Star />}
        </Button>
      </SearchBarWrapper>

      <CardWrapper>
        {filteredGuides?.map((guide) => {
          const isFavorite = favorites.includes(guide.id);

          return (
            <GuideCard
              key={guide.id}
              guide={guide}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
          );
        })}
      </CardWrapper>
    </Container>
  );
};

export default UserGuidePage;

const Container = styled.div`
  padding: 20px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CardWrapper = styled.div`
  display: grid;
  gap: 12px;

  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SearchBarWrapper = styled.div`
  display: flex;
  gap: 8px;

  .search {
    flex-grow: 1;
    position: relative;
  }

  .icon {
    display: flex;
    gap: 6px;
    align-items: center;

    position: absolute;
    top: 9px;
    right: 12px;
  }

  svg {
    color: ${({ theme }) => theme.colors.gray700};
    cursor: pointer;
  }
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
