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
    <Container>
      <div className="title">{title}</div>
      <Input placeholder={placeholder} value={value} {...props} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;

  .title {
    color: ${({ theme }) => theme.colors.gray900};
    font-size: ${({ theme }) => theme.font.fontSize.text16};
    font-weight: ${({ theme }) => theme.font.fontWeight.semibold};
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.gray50};

  color: ${({ theme }) => theme.colors.gray900};
  font-size: ${({ theme }) => theme.font.fontSize.text16};
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
