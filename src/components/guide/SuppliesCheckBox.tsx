import styled from 'styled-components';

interface SuppliesCheckBoxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (id: string) => void;
}

export const SuppliesCheckBox = ({
  id,
  label,
  checked,
  onChange,
}: SuppliesCheckBoxProps) => {
  return (
    <CheckBoxWrapper>
      <CheckBoxInput
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => onChange?.(id)}
      />
      <Label htmlFor={id}>{label}</Label>
    </CheckBoxWrapper>
  );
};

const CheckBoxWrapper = styled.div`
  padding: 12px;
  display: flex;
  gap: 12px;
  align-items: center;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.gray50};
  }
`;

const CheckBoxInput = styled.input`
  accent-color: black;
  cursor: pointer;
`;

const Label = styled.label`
  width: 100%;
  height: 100%;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.font.fontSize.text14};
  font-weight: ${({ theme }) => theme.font.fontWeight.medium};

  input:checked + & {
    color: ${({ theme }) => theme.colors.gray300};
    text-decoration: line-through;
  }
`;
