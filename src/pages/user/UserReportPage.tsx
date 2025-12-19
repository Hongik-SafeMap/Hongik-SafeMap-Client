import styled from 'styled-components';
import { useEffect, useState } from 'react';
import X from '@/assets/icons/X.svg?react';
import LocationIcon from '@/assets/icons/Location.svg?react';
import { NavBar } from '@/components/common/NavBar';
import { Dropdown } from '@/components/common/Dropdown';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import type { ReportMedia } from '@/types/Report';
import { FileUploadSection } from '@/components/report/FileUploadSection';
import { Button } from '@/components/common/Button';

const UserReportPage = () => {
  const { handleGoBack } = useHandleNavigate();

  const [disasterType, setDisasterType] = useState<string[]>([]);
  const [description, setDescription] = useState<string>('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const [uploadedFiles, setUploadedFiles] = useState<ReportMedia[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (err) => {
        console.error('위치 정보 가져오기 오류:', err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
      },
    );
  }, []);

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((media) => URL.revokeObjectURL(media.previewUrl));
    };
  }, [uploadedFiles]);

  const handleButtonClick = () => {
    console.log(disasterType, description);
  };

  const isValid = disasterType.length > 0 && description.length > 0;

  return (
    <Container>
      <NavBar
        left={<NavLeft onClick={handleGoBack} />}
        center={<NavCenter>재난 상황 제보</NavCenter>}
      />

      <div className="section">
        <div>재난 유형</div>
        <Dropdown
          title="재난 유형"
          options={['지진', '화재', '폭우/침수', '태풍', '산사태', '기타']}
          selectedOption={disasterType}
          setSelectedOption={setDisasterType}
        />
      </div>

      <div className="section">
        <label htmlFor="description">상황 설명</label>
        <Description
          id="description"
          typeof="text"
          placeholder="현재 상황을 자세히 설명해주세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="section">
        <div>위치 정보</div>
        <Location>
          <LocationIcon />
          <div className="location">
            현재 위치: {longitude?.toFixed(4)}, {latitude?.toFixed(4)}
          </div>
        </Location>
      </div>

      <div className="section">
        <div>사진/영상 첨부</div>
        <FileUploadSection
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
        />
      </div>

      <Button
        height="36px"
        variant={isValid ? 'black' : 'gray'}
        disabled={!isValid}
        onClick={handleButtonClick}
      >
        제보 등록하기
      </Button>
    </Container>
  );
};

export default UserReportPage;

const Container = styled.div`
  padding: 0px 20px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .section {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;

    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.font.fontSize.text14};
    font-weight: ${({ theme }) => theme.font.fontWeight.semibold};
  }
`;

const NavLeft = styled(X)`
  cursor: pointer;
`;

const NavCenter = styled.label`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.font.fontSize.text16};
  font-weight: ${({ theme }) => theme.font.fontWeight.bold};
`;

const Description = styled.textarea`
  padding: 16px;
  width: 100%;
  height: 160px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray50};
  resize: none;
  box-sizing: border-box;
  border: none;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.font.fontSize.text14};
  font-weight: ${({ theme }) => theme.font.fontWeight.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray500};
  }

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.gray200};
    outline: none;
  }
`;

const Location = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.gray50};
  border-radius: 8px;

  .location {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.font.fontSize.text14};
    font-weight: ${({ theme }) => theme.font.fontWeight.medium};
  }
`;
