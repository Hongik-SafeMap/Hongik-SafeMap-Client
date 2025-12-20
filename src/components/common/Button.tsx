import styled, { css } from 'styled-components';

type ButtonColor = 'mainBlue' | 'subBlue' | 'white' | 'gray' | 'red' | 'black';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonColor;
  children: React.ReactNode;
  width?: string;
  height?: string;
}

export const Button = ({
  variant = 'mainBlue',
  children,
  width = '',
  height = '',
  ...props
}: ButtonProps) => {
  return (
    <StyledButton variant={variant} width={width} height={height} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  variant: ButtonColor;
  width: string;
  height: string;
}>`
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => height};

  font-size: ${({ theme }) => theme.font.fontSize.text16};
  font-weight: ${({ theme }) => theme.font.fontWeight.bold};

  border-radius: 12px;

  ${({ variant }) => getVariantStyle(variant)}
`;

const getVariantStyle = (variant: ButtonColor) => {
  switch (variant) {
    case 'mainBlue':
      return css`
        background-color: ${({ theme }) => theme.colors.mainBlue};
        color: ${({ theme }) => theme.colors.white};
      `;
    case 'subBlue':
      return css`
        background-color: ${({ theme }) => theme.colors.subBlue};
        color: ${({ theme }) => theme.colors.mainBlue};
      `;
    case 'white':
      return css`
        background-color: ${({ theme }) => theme.colors.white};
        color: ${({ theme }) => theme.colors.gray900};
        border: 1px solid ${({ theme }) => theme.colors.gray100};
      `;
    case 'gray':
      return css`
        background-color: ${({ theme }) => theme.colors.gray200};
        color: ${({ theme }) => theme.colors.white};
      `;
    case 'red':
      return css`
        background-color: ${({ theme }) => theme.colors.mainRed};
        color: ${({ theme }) => theme.colors.white};
      `;
    case 'black':
      return css`
        background-color: ${({ theme }) => theme.colors.black};
        color: ${({ theme }) => theme.colors.white};
      `;
  }
};
