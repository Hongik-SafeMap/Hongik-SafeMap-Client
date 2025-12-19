import styled, { css } from 'styled-components';

type ButtonColor = 'white' | 'gray' | 'red' | 'black';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonColor;
  children: React.ReactNode;
}

export const Tag = ({ variant, children, ...props }: ButtonProps) => {
  return (
    <TagWrapper variant={variant} {...props}>
      {children}
    </TagWrapper>
  );
};

const TagWrapper = styled.button<{
  variant: ButtonColor;
}>`
  padding: 4px 8px;

  font-size: ${({ theme }) => theme.font.fontSize.text12};
  font-weight: ${({ theme }) => theme.font.fontWeight.medium};

  border-radius: 8px;

  ${({ variant }) => getVariantStyle(variant)}
`;

const getVariantStyle = (variant: ButtonColor) => {
  switch (variant) {
    case 'white':
      return css`
        background-color: ${({ theme }) => theme.colors.white};
        color: ${({ theme }) => theme.colors.gray900};
        border: 1px solid ${({ theme }) => theme.colors.gray100};
      `;
    case 'gray':
      return css`
        background-color: ${({ theme }) => theme.colors.gray100};
        color: ${({ theme }) => theme.colors.gray900};
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
