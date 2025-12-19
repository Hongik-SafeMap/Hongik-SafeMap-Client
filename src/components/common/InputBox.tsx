import styled from 'styled-components';

interface InputBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  placeholder?: string;
  value?: string;
}

export const InputBox = ({
  title,
  placeholder,
  value,
  ...props
}: InputBoxProps) => {
  return (
    <InputWrapper>
      <div className="input">{title}</div>
      <Input placeholder={placeholder} value={value} {...props} />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;

  .input {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.font.fontSize.text14};
    font-weight: ${({ theme }) => theme.font.fontWeight.semibold};
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  padding: 0px 12px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray50};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.font.fontSize.text14};
  font-weight: ${({ theme }) => theme.font.fontWeight.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray300};
  }

  &:hover,
  &:focus {
    outline: none;
    caret-color: ${({ theme }) => theme.colors.gray900};
  }
`;
