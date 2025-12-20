import styled from 'styled-components';
import { useEffect, useState } from 'react';
import X from '@/assets/icons/X.svg?react';
import LocationIcon from '@/assets/icons/Location.svg?react';
import { NavBar } from '@/components/common/NavBar';
import { Dropdown } from '@/components/common/Dropdown';
import { Button } from '@/components/common/Button';
import { FileUploadSection } from '@/components/report/FileUploadSection';
import { useHandleNavigate } from '@/hooks/useHandleNavigate';
import type {
  DisasterType,
  ReportMedia,
  ReportRequest,
  RiskLevel,
} from '@/types/Report';
import { usePostReports } from '@/api/report';
import { InputBox } from '@/components/common/InputBox';

const UserReportPage = () => {
  const { handleGoBack, handleNavigate } = useHandleNavigate();

  const disasterList: DisasterType[] = [
    '화재',
    '지진',
    '홍수',
    '산사태',
    '태풍',
    '기타',
  ];
  const riskLevelList: RiskLevel[] = ['긴급', '높음', '보통', '낮음'];

  const [disasterType, setDisasterType] = useState('');
  const [riskLevel, setRiskLevel] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [address, setAddress] = useState('');

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

  const { mutate: reportMutation } = usePostReports();

  const handleButtonClick = () => {
    const mediaUrls = uploadedFiles.map((media) => media.previewUrl);

    const reportRequest: ReportRequest = {
      disasterType: disasterType as DisasterType,
      riskLevel: riskLevel as RiskLevel,
      disasterDescription: description,
      latitude: latitude,
      longitude: longitude,
      address: address,
      mediaUrls: mediaUrls,
    };

    reportMutation(reportRequest, {
      onSuccess: () => {
        handleNavigate('/user/my');
      },
      onError: () => {
        alert('제보를 등록하지 못했습니다.');
      },
    });
  };

  const isValid =
    disasterType && riskLevel && address.length > 0 && description.length > 0;

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
          options={disasterList}
          selectedOption={disasterType}
          setSelectedOption={setDisasterType}
          style={{ height: '40px' }}
        />
      </div>

      <div className="section">
        <div>위험 등급</div>
        <Dropdown
          title="위험 등급"
          options={riskLevelList}
          selectedOption={riskLevel}
          setSelectedOption={setRiskLevel}
          style={{ height: '40px' }}
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
        <InputBox
          title="주소"
          placeholder="주소를 입력하세요"
          style={{ padding: '12px 16px', height: '44px' }}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="section">
        <div>사진/영상 첨부</div>
        <FileUploadSection
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
        />
      </div>

      <Button
        height="40px"
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
