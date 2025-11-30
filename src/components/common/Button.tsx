import styled, { css } from 'styled-components';

type ButtonVariant = 'mainBlue' | 'subBlue' | 'white' | 'gray';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  width?: string | null;
  height?: string | null;
}

interface StyledButtonProps {
  $variant: ButtonVariant;
  $disabled?: boolean;
  $width: string | null;
  $height: string | null;
}

export const Button = ({
  variant = 'mainBlue',
  children,
  width = null,
  height = null,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton $variant={variant} $width={width} $height={height} {...props}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<StyledButtonProps>`
  width: ${({ $width }) => ($width ? $width : '100%')};
  height: ${({ $height }) => $height};

  font-size: ${({ theme }) => theme.font.fontSize.text16};
  font-weight: ${({ theme }) => theme.font.fontWeight.bold};

  border-radius: 12px;

  ${({ $variant }) => getVariantStyle($variant)}
`;

const getVariantStyle = (variant: ButtonVariant) => {
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
        background-color: ${({ theme }) => theme.colors.gray300};
        color: ${({ theme }) => theme.colors.white};
      `;
  }
};
