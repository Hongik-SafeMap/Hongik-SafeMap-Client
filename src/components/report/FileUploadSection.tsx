import styled from 'styled-components';
import { useCallback, useRef } from 'react';
import Close from '@/assets/icons/Close.svg?react';
import Camera from '@/assets/icons/Camera.svg?react';
import type { ReportMedia } from '@/types/Report';

interface FileUploadSectionProps {
  uploadedFiles: ReportMedia[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<ReportMedia[]>>;
}

export const FileUploadSection = ({
  uploadedFiles,
  setUploadedFiles,
}: FileUploadSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;

      if (files && files.length > 0) {
        const newUploadedFiles: ReportMedia[] = Array.from(files).map(
          (file) => {
            const fileType = file.type.startsWith('image/')
              ? 'image'
              : file.type.startsWith('video/')
                ? 'video'
                : 'unknown';
            return {
              id: `${file.name}`,
              file: file,
              previewUrl: URL.createObjectURL(file),
              type: fileType,
            };
          },
        );

        setUploadedFiles((prevFiles) => [...prevFiles, ...newUploadedFiles]);
      }
    },
    [setUploadedFiles],
  );

  const handleRemoveFile = useCallback(
    (idToRemove: string) => {
      setUploadedFiles((prevFiles) => {
        const fileToRemove = prevFiles.find((f) => f.id === idToRemove);
        if (fileToRemove) {
          URL.revokeObjectURL(fileToRemove.previewUrl); // 메모리 해제
        }
        return prevFiles.filter(
          (uploadedFile) => uploadedFile.id !== idToRemove,
        );
      });
    },
    [setUploadedFiles],
  );

  return (
    <>
      <PhotoButton onClick={handlePhotoButtonClick}>
        <Camera />
        파일 선택
      </PhotoButton>

      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept="image/*,video/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {uploadedFiles.length > 0 && (
        <Photos>
          {uploadedFiles.map((uploadedFile) => (
            <div className="photo" key={uploadedFile.id}>
              {uploadedFile.type === 'image' ? (
                <img
                  src={uploadedFile.previewUrl}
                  alt={uploadedFile.file.name}
                />
              ) : uploadedFile.type === 'video' ? (
                <video src={uploadedFile.previewUrl} controls />
              ) : (
                <div> {uploadedFile.file.name} (미지원 형식)</div>
              )}
              <DeletePhoto onClick={() => handleRemoveFile(uploadedFile.id)} />
            </div>
          ))}
        </Photos>
      )}
    </>
  );
};

const PhotoButton = styled.button`
  padding: 12px;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  border-radius: 12px;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.font.fontSize.text14};
  font-weight: ${({ theme }) => theme.font.fontWeight.medium};
`;

const Photos = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: scroll;
  flex-wrap: nowrap;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  .photo {
    width: 200px;
    height: 200px;
    position: relative;
  }

  img,
  video {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
`;

const DeletePhoto = styled(Close)`
  cursor: pointer;

  position: absolute;
  top: 5px;
  right: 5px;
`;
