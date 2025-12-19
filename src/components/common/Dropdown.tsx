import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import Chevron from '@/assets/icons/ChevronUp.svg?react';

interface DropdownProps {
  title: string;
  options: string[];
  selectedOption: string[];
  setSelectedOption: (currentValue: string[]) => void;
}

export const Dropdown = ({
  title,
  options,
  selectedOption,
  setSelectedOption,
}: DropdownProps) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [showOptions, setShowOptions] = useState(false);

  const handleOutsideClick = (e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleSelectOption = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOption([value]);
    setShowOptions(false);
  };

  const dropdownLabel = selectedOption.length > 0 ? selectedOption[0] : title;

  return (
    <DropdownWrapper
      onClick={() => setShowOptions((prev) => !prev)}
      ref={selectRef}
    >
      <DropdownHeader isSelected={selectedOption.length > 0}>
        <div>{dropdownLabel}</div>
        <DropdownToggle down={showOptions} />
      </DropdownHeader>

      {showOptions && (
        <DropdownOptionWrapper>
          {options.map((option) => (
            <DropdownOption
              key={option}
              onClick={(e) => handleSelectOption(option, e)}
            >
              {option}
            </DropdownOption>
          ))}
        </DropdownOptionWrapper>
      )}
    </DropdownWrapper>
  );
};

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
`;

const DropdownHeader = styled.div<{ isSelected: boolean }>`
  padding: 0px 12px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray50};

  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.gray900 : theme.colors.gray500};
  font-size: ${({ theme }) => theme.font.fontSize.text14};
  font-weight: ${({ theme }) => theme.font.fontWeight.medium};
`;

const DropdownToggle = styled(Chevron)<{ down: boolean }>`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray500};
  transform: ${({ down }) => (down ? 'none' : 'rotate(180deg)')};
`;

const DropdownOptionWrapper = styled.div`
  width: 100%;
  max-height: 160px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  border-radius: 8px;

  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;

  position: absolute;
  top: 40px;
  z-index: 2;
`;

const DropdownOption = styled.div`
  padding: 12px;
  height: 24px;
  display: flex;
  border-radius: 8px;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.font.fontSize.text14};
  font-weight: ${({ theme }) => theme.font.fontWeight.medium};

  &:hover {
    background: ${({ theme }) => theme.colors.gray50};
  }
`;
